'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageview } from './tracker'

interface AnalyticsProviderProps {
  projectId: string
  children: React.ReactNode
}

export function AnalyticsProvider({ projectId, children }: AnalyticsProviderProps): JSX.Element {
  const pathname = usePathname()
  const lastPath = useRef<string>('')

  useEffect(() => {
    if (pathname && pathname !== lastPath.current) {
      lastPath.current = pathname
      trackPageview(projectId, pathname)
    }
  }, [pathname, projectId])

  return <>{children}</>
}
