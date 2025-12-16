/**
 * Simple in-memory rate limiter for AI API endpoints
 * Limits requests per IP address or user identifier
 *
 * In production, consider using Redis for distributed rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (note: this won't work across serverless instances)
// For production, use Redis, Upstash, or similar
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Optional key prefix for different endpoints */
  keyPrefix?: string;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
}

/**
 * Check if a request should be rate limited
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanupExpiredEntries();

  const { limit, windowMs, keyPrefix = 'default' } = config;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();

  let entry = rateLimitStore.get(key);

  // If no entry or entry has expired, create new one
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(key, entry);

    return {
      success: true,
      remaining: limit - 1,
      resetAt: entry.resetAt,
    };
  }

  // Check if limit exceeded
  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Pre-configured rate limiters for different endpoints
 */
export const RateLimiters = {
  /** AI Chat: 20 requests per minute */
  aiChat: (identifier: string) =>
    checkRateLimit(identifier, {
      limit: 20,
      windowMs: 60000,
      keyPrefix: 'ai-chat',
    }),

  /** Plan Generation: 5 requests per minute (expensive operation) */
  planGeneration: (identifier: string) =>
    checkRateLimit(identifier, {
      limit: 5,
      windowMs: 60000,
      keyPrefix: 'plan-gen',
    }),

  /** General API: 60 requests per minute */
  general: (identifier: string) =>
    checkRateLimit(identifier, {
      limit: 60,
      windowMs: 60000,
      keyPrefix: 'general',
    }),

  /** Export: 10 requests per minute */
  export: (identifier: string) =>
    checkRateLimit(identifier, {
      limit: 10,
      windowMs: 60000,
      keyPrefix: 'export',
    }),
};

/**
 * Get identifier from request (IP address or forwarded-for header)
 */
export function getClientIdentifier(request: Request): string {
  // Check for forwarded IP (common with proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Get first IP if multiple are present
    return forwarded.split(',')[0].trim();
  }

  // Check for real IP header (Cloudflare, etc.)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a hash of user-agent + accept-language as fingerprint
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const acceptLang = request.headers.get('accept-language') || 'unknown';

  // Simple hash function
  let hash = 0;
  const str = `${userAgent}-${acceptLang}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return `fingerprint-${Math.abs(hash).toString(16)}`;
}

/**
 * Create rate limit response with proper headers
 */
export function createRateLimitResponse(result: RateLimitResult): Response {
  return Response.json(
    {
      error: 'Too many requests',
      message: `Rate limit exceeded. Please try again in ${result.retryAfter} seconds.`,
      retryAfter: result.retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfter),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(result.resetAt),
      },
    }
  );
}
