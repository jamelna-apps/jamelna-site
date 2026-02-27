export interface AnalyticsEvent {
  projectId: string
  sessionId: string
  fingerprint: string
  path: string
  referrer: string
  browser: string
  os: string
  deviceType: 'desktop' | 'tablet' | 'mobile'
  screenWidth: number
  screenHeight: number
  language: string
  timezone: string
  timestamp: string
}

export interface AnalyticsSession {
  sessionId: string
  projectId: string
  fingerprint: string
  startedAt: string
  lastSeenAt: string
  pages: string[]
  entryPage: string
  exitPage: string
  pageCount: number
  duration: number
  browser: string
  os: string
  deviceType: 'desktop' | 'tablet' | 'mobile'
  country?: string
  region?: string
  city?: string
}

export interface GeoData {
  country?: string
  region?: string
  city?: string
}

export interface AnalyticsPayload {
  sessionId: string
  fingerprint: string
  path: string
  referrer: string
  browser: string
  os: string
  deviceType: 'desktop' | 'tablet' | 'mobile'
  screenWidth: number
  screenHeight: number
  language: string
  timezone: string
  security?: SecuritySignals
}

// Security monitoring types

export interface SecuritySignals {
  isBot: boolean
  webdriver: boolean
  pluginCount: number
  hasChrome: boolean
  screenConsistent: boolean
  touchSupport: boolean
}

export type SecurityEventType = 'path_probe' | 'attack_pattern' | 'bot_detected' | 'csp_violation' | 'client_error' | 'rate_limit'
export type SecuritySeverity = 'low' | 'medium' | 'high' | 'critical'

export interface SecurityEvent {
  type: SecurityEventType
  severity: SecuritySeverity
  detail: string
  fingerprint?: string
  path?: string
}
