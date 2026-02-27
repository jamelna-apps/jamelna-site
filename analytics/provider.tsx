'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageview } from './tracker'
import { initErrorTracking } from './error-tracker'

interface AnalyticsProviderProps {
  projectId: string
  children: React.ReactNode
}

export function AnalyticsProvider({ projectId, children }: AnalyticsProviderProps): React.ReactNode {
  const pathname = usePathname()
  const lastPath = useRef<string>('')
  const errorTrackingInit = useRef(false)

  useEffect(() => {
    if (!errorTrackingInit.current) {
      errorTrackingInit.current = true
      initErrorTracking(projectId)
    }
  }, [projectId])

  useEffect(() => {
    if (pathname && pathname !== lastPath.current) {
      lastPath.current = pathname
      trackPageview(projectId, pathname)
    }
  }, [pathname, projectId])

  return <>{children}</>
}
