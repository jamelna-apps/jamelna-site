import { NextRequest, NextResponse } from 'next/server'

/**
 * Regex matching known probe paths that bots scan for.
 * Returns 404 at the edge — no serverless function invoked.
 */
const PROBE_PATHS = /^\/(wp-admin|wp-login|wp-content|wp-includes|xmlrpc\.php|\.env|\.git|\.svn|\.htaccess|phpmyadmin|pma|adminer|cgi-bin|shell|backup|config\.php|administrator|admin\.php|setup\.php|install\.php|vendor\/phpunit|eval-stdin\.php|debug|\.aws|\.ssh|\.DS_Store|\.vscode|\.idea|node_modules|composer\.(json|lock)|package\.json|Dockerfile)/i

const ATTACK_PATTERNS = /(\.\.\/)|(<%)|(<script)|(%00)|(\$\{)/i

/**
 * Call from your site's middleware to block probe paths at the edge.
 * Returns a Response if blocked, or null if the request is clean.
 *
 * Usage in middleware.ts:
 *   import { blockProbes } from '@/analytics/middleware'
 *   export function middleware(req) {
 *     const blocked = blockProbes(req)
 *     if (blocked) return blocked
 *     // ... your other middleware logic
 *   }
 */
export function blockProbes(req: NextRequest): NextResponse | null {
  const path = req.nextUrl.pathname

  if (PROBE_PATHS.test(path) || ATTACK_PATTERNS.test(path)) {
    return new NextResponse(null, { status: 404 })
  }

  return null
}
