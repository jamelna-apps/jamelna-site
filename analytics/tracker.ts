'use client'

import type { AnalyticsPayload } from './types'

let sessionId: string | null = null

function getSessionId(): string {
  if (sessionId) return sessionId
  const stored = sessionStorage.getItem('_a_sid')
  if (stored) {
    sessionId = stored
    return stored
  }
  const id = crypto.randomUUID()
  sessionStorage.setItem('_a_sid', id)
  sessionId = id
  return id
}

async function generateFingerprint(): Promise<string> {
  const raw = [
    navigator.userAgent,
    screen.width + 'x' + screen.height,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ].join('|')
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw))
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16)
}

function parseUA(): { browser: string; os: string; deviceType: 'desktop' | 'tablet' | 'mobile' } {
  const ua = navigator.userAgent

  let browser = 'Unknown'
  if (ua.includes('Firefox/')) browser = 'Firefox'
  else if (ua.includes('Edg/')) browser = 'Edge'
  else if (ua.includes('Chrome/') && !ua.includes('Edg/')) browser = 'Chrome'
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari'
  else if (ua.includes('Opera/') || ua.includes('OPR/')) browser = 'Opera'

  let os = 'Unknown'
  if (ua.includes('Mac OS X')) os = 'macOS'
  else if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'

  let deviceType: 'desktop' | 'tablet' | 'mobile' = 'desktop'
  if (/Mobi|Android/i.test(ua) && !/iPad/i.test(ua)) deviceType = 'mobile'
  else if (
    /iPad|Tablet/i.test(ua) ||
    (screen.width >= 768 && screen.width <= 1024 && 'ontouchstart' in window)
  ) deviceType = 'tablet'

  return { browser, os, deviceType }
}

export async function trackPageview(projectId: string, path: string): Promise<void> {
  try {
    const { browser, os, deviceType } = parseUA()
    const fingerprint = await generateFingerprint()

    const payload: AnalyticsPayload = {
      sessionId: getSessionId(),
      fingerprint,
      path,
      referrer: document.referrer,
      browser,
      os,
      deviceType,
      screenWidth: screen.width,
      screenHeight: screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    // Use sendBeacon for reliability, fall back to fetch
    const body = JSON.stringify({ projectId, ...payload })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', body)
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true
      })
    }
  } catch {
    // Silent fail — analytics should never break the app
  }
}
