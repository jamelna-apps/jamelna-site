'use client'

export function initErrorTracking(projectId: string): void {
  if (typeof window === 'undefined') return

  window.addEventListener('error', (event) => {
    try {
      const payload = {
        projectId,
        type: 'client_error',
        detail: `${event.message} at ${event.filename}:${event.lineno}`,
        path: window.location.pathname,
        timestamp: new Date().toISOString()
      }
      navigator.sendBeacon('/api/security-events', JSON.stringify(payload))
    } catch { /* silent */ }
  })

  window.addEventListener('unhandledrejection', (event) => {
    try {
      const payload = {
        projectId,
        type: 'client_error',
        detail: `Unhandled rejection: ${event.reason?.message || String(event.reason)}`,
        path: window.location.pathname,
        timestamp: new Date().toISOString()
      }
      navigator.sendBeacon('/api/security-events', JSON.stringify(payload))
    } catch { /* silent */ }
  })
}
