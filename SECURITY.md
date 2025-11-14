# Security Overview

This document outlines the security measures implemented for jamelna-site and recommendations for maintaining security.

## Security Measures Implemented

### 1. Security Headers
All pages include comprehensive security headers configured in `next.config.ts`:

- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **Permissions-Policy** - Restricts access to browser features (camera, microphone, geolocation)
- **Content-Security-Policy (CSP)** - Protects against XSS and injection attacks

### 2. Environment Variables
- All sensitive data is stored in `.env.local` (not committed to git)
- `.env.example` provides templates without sensitive values
- `.gitignore` properly excludes all `.env*` files

### 3. Dependencies
- Zero known vulnerabilities (verified with `npm audit`)
- Regular dependency updates recommended

### 4. HTTPS/SSL
- Automatic HTTPS provided by Vercel
- HSTS header automatically added by Vercel

### 5. API Routes
- Read-only gallery API (`/api/galleries`)
- Returns only public data (file-based photo gallery)
- No sensitive operations

## Security Recommendations

### For Vercel Dashboard

1. **Enable Vercel Authentication Protection** (optional):
   - Go to Project Settings → Deployment Protection
   - Enable for preview deployments if needed
   - Production should remain public

2. **Review Environment Variables**:
   - Review all environment variables regularly
   - Rotate tokens if compromised

3. **Enable Security Headers** (already done in code):
   - Headers are configured in `next.config.ts`
   - Vercel automatically applies these

### Ongoing Security Practices

1. **Dependency Updates**:
   ```bash
   npm audit
   npm update
   ```

2. **Monitor Vercel Logs**:
   - Check for unusual traffic patterns
   - Review error logs regularly

3. **DNS Security**:
   - Enable DNSSEC if supported by registrar
   - Monitor DNS records for unauthorized changes

4. **Contact Form Security** (if added in future):
   - Add rate limiting
   - Implement CAPTCHA/honeypot
   - Validate and sanitize all inputs
   - Use server-side validation

## Security Checklist

- [x] Security headers configured
- [x] Environment variables properly secured
- [x] Dependencies audit passed (0 vulnerabilities)
- [x] HTTPS enabled (Vercel automatic)
- [x] API routes reviewed and secured
- [x] .gitignore configured for sensitive files
- [x] CSP configured for XSS protection
- [x] Clickjacking protection enabled
- [x] MIME sniffing protection enabled

## Incident Response

If you suspect a security issue:

1. **Rotate all tokens immediately** (Sanity, Vercel)
2. **Review Vercel logs** for suspicious activity
3. **Check recent deployments** in Vercel dashboard
4. **Update dependencies** with `npm update`
5. **Review environment variables** in Vercel dashboard

## Additional Resources

- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security Documentation](https://vercel.com/docs/security)
- [Sanity Security Guide](https://www.sanity.io/docs/security)

## Contact

For security concerns, contact: joe@jamelna.com
