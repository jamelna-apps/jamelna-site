import type { NextRequest } from 'next/server'
import { blockProbes } from '@/analytics/middleware'

export function middleware(request: NextRequest) {
  const blocked = blockProbes(request)
  if (blocked) return blocked
}

export const config = {
  matcher: [
    '/wp-admin/:path*',
    '/wp-login/:path*',
    '/wp-content/:path*',
    '/wp-includes/:path*',
    '/.env/:path*',
    '/.git/:path*',
    '/phpmyadmin/:path*',
    '/xmlrpc.php',
    '/cgi-bin/:path*',
  ],
}
