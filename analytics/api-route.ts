import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import type { AnalyticsPayload, GeoData, SecuritySignals, SecurityEvent } from './types'

// Initialize Firebase Admin (lazy singleton)
function getFirestoreDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT || '', 'base64').toString()
    )
    initializeApp({ credential: cert(serviceAccount as ServiceAccount) })
  }
  return getFirestore()
}

function getGeoData(req: NextRequest): GeoData {
  return {
    country: req.headers.get('x-vercel-ip-country') || undefined,
    region: req.headers.get('x-vercel-ip-country-region') || undefined,
    city: req.headers.get('x-vercel-ip-city') || undefined
  }
}

function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0]
}

// Security detection patterns
const PROBE_PATHS = /^\/(wp-admin|wp-login|wp-content|wp-includes|xmlrpc\.php|\.env|\.git|\.svn|\.htaccess|phpmyadmin|pma|adminer|cgi-bin|shell|backup|config\.php|administrator|admin\.php|setup\.php|install\.php|vendor\/phpunit|eval-stdin\.php|debug|\.aws|\.ssh|\.DS_Store|\.vscode|\.idea|node_modules|composer\.(json|lock)|package\.json|Dockerfile)/i

const ATTACK_PATTERNS: { pattern: RegExp; detail: string; severity: 'high' | 'critical' }[] = [
  { pattern: /\.\.\//, detail: 'Path traversal attempt', severity: 'high' },
  { pattern: /<script/i, detail: 'XSS attempt', severity: 'high' },
  { pattern: /'\s*(OR|AND)\s/i, detail: 'SQL injection attempt', severity: 'critical' },
  { pattern: /UNION\s+SELECT/i, detail: 'SQL injection (UNION)', severity: 'critical' },
  { pattern: /\$\{/, detail: 'Template injection attempt', severity: 'high' },
  { pattern: /%00/, detail: 'Null byte injection', severity: 'high' }
]

const BOT_UA = /bot|crawl|spider|headless|phantom|selenium|puppeteer|playwright|wget|curl|scrapy|python-requests|go-http-client|ahrefsbot|semrushbot|dotbot|mj12bot/i

async function detectSecurityEvents(
  db: ReturnType<typeof getFirestore>,
  projectId: string,
  path: string,
  referrer: string,
  fingerprint: string,
  browser: string,
  geo: GeoData,
  ua: string,
  security?: SecuritySignals
): Promise<void> {
  const events: SecurityEvent[] = []

  // Truncate inputs before regex evaluation to prevent ReDoS
  const safePath = path.slice(0, 2048)
  const safeReferrer = referrer.slice(0, 2048)

  // 1. Suspicious path probing
  if (PROBE_PATHS.test(safePath)) {
    events.push({ type: 'path_probe', severity: 'medium', detail: `Probe: ${safePath}`, fingerprint, path: safePath })
  }

  // 2. Attack payload detection
  for (const { pattern, detail, severity } of ATTACK_PATTERNS) {
    if (pattern.test(safePath) || pattern.test(safeReferrer)) {
      events.push({ type: 'attack_pattern', severity, detail, fingerprint, path: safePath })
      break
    }
  }

  // 3. Bot scoring
  let botScore = 0
  if (BOT_UA.test(ua)) botScore += 3
  if (security) {
    if (security.webdriver) botScore += 3
    if (security.pluginCount === 0) botScore += 1
    if (!security.hasChrome && browser === 'Chrome') botScore += 2
    if (security.isBot) botScore += 3
  }
  if (botScore >= 3) {
    events.push({ type: 'bot_detected', severity: 'low', detail: `Bot score: ${botScore}`, fingerprint, path })
  }

  if (events.length === 0) return

  const timestamp = new Date().toISOString()
  const dateKey = timestamp.split('T')[0]

  // Write raw security events
  const batch = db.batch()
  for (const event of events) {
    const ref = db.collection('security_events').doc()
    batch.set(ref, {
      projectId,
      type: event.type,
      severity: event.severity,
      detail: event.detail,
      fingerprint: event.fingerprint || null,
      path: event.path || null,
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
      timestamp
    })
  }
  await batch.commit()

  // Update daily security aggregation
  const highSeverity = events.filter(e => e.severity === 'high' || e.severity === 'critical').length
  const dailyRef = db.collection('security_daily').doc(`${projectId}_${dateKey}`)
  const dailySnap = await dailyRef.get()

  if (dailySnap.exists) {
    const updates: Record<string, unknown> = {
      totalEvents: FieldValue.increment(events.length),
      highSeverityCount: FieldValue.increment(highSeverity)
    }
    for (const event of events) {
      updates[`eventsByType.${event.type}`] = FieldValue.increment(1)
    }
    const probes = events.filter(e => e.type === 'path_probe')
    for (const probe of probes) {
      if (probe.path) {
        updates[`topProbePaths.${probe.path.replace(/\//g, '__').replace(/\./g, '_')}`] = FieldValue.increment(1)
      }
    }
    if (fingerprint) {
      updates[`topFingerprints.${fingerprint}`] = FieldValue.increment(1)
    }
    if (geo.country) {
      updates[`topCountries.${geo.country}`] = FieldValue.increment(1)
    }
    await dailyRef.update(updates)
  } else {
    const eventsByType: Record<string, number> = {}
    for (const e of events) eventsByType[e.type] = (eventsByType[e.type] || 0) + 1
    const probes = events.filter(e => e.type === 'path_probe')
    const topProbePaths: Record<string, number> = {}
    for (const p of probes) {
      if (p.path) topProbePaths[p.path.replace(/\//g, '__').replace(/\./g, '_')] = 1
    }

    await dailyRef.set({
      projectId,
      date: dateKey,
      totalEvents: events.length,
      highSeverityCount: highSeverity,
      eventsByType,
      topProbePaths,
      topFingerprints: fingerprint ? { [fingerprint]: 1 } : {},
      topCountries: geo.country ? { [geo.country]: 1 } : {}
    })
  }
}

export async function handleAnalytics(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = (await req.json()) as AnalyticsPayload & { projectId: string }
    const {
      projectId,
      sessionId,
      fingerprint,
      path,
      referrer,
      browser,
      os,
      deviceType,
      screenWidth,
      screenHeight,
      language,
      timezone,
      security
    } = body
    const ua = req.headers.get('user-agent') || ''

    if (!projectId || !sessionId || !path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = getFirestoreDb()
    const geo = getGeoData(req)
    const now = new Date()
    const timestamp = now.toISOString()
    const dateKey = getDateKey(now)

    // 1. Write raw event
    await db.collection('analytics_events').add({
      projectId,
      sessionId,
      fingerprint,
      path,
      referrer,
      browser,
      os,
      deviceType,
      screenWidth,
      screenHeight,
      language,
      timezone,
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
      timestamp
    })

    // 2. Update session document (upsert)
    const sessionRef = db.collection('analytics_sessions').doc(sessionId)
    const sessionSnap = await sessionRef.get()

    if (sessionSnap.exists) {
      await sessionRef.update({
        lastSeenAt: timestamp,
        exitPage: path,
        pageCount: FieldValue.increment(1),
        pages: FieldValue.arrayUnion(path)
      })
    } else {
      await sessionRef.set({
        sessionId,
        projectId,
        fingerprint,
        startedAt: timestamp,
        lastSeenAt: timestamp,
        pages: [path],
        entryPage: path,
        exitPage: path,
        pageCount: 1,
        duration: 0,
        browser,
        os,
        deviceType,
        country: geo.country || null,
        region: geo.region || null,
        city: geo.city || null
      })
    }

    // 3. Update daily aggregation
    const dailyRef = db.collection('analytics_daily').doc(`${projectId}_${dateKey}`)
    const dailySnap = await dailyRef.get()

    if (dailySnap.exists) {
      const updates: Record<string, unknown> = {
        pageviews: FieldValue.increment(1),
        [`topPages.${path.replace(/\//g, '__').replace(/\./g, '_')}`]: FieldValue.increment(1),
        [`browsers.${browser}`]: FieldValue.increment(1),
        [`devices.${deviceType}`]: FieldValue.increment(1),
        // Track unique visitors by fingerprint array
        fingerprints: FieldValue.arrayUnion(fingerprint)
      }

      if (geo.country) {
        updates[`countries.${geo.country}`] = FieldValue.increment(1)
      }

      if (referrer) {
        const refDomain = (() => {
          try {
            return new URL(referrer).hostname
          } catch {
            return 'direct'
          }
        })()
        updates[`referrers.${refDomain.replace(/\./g, '_')}`] = FieldValue.increment(1)
      }

      await dailyRef.update(updates)
    } else {
      const refDomain = referrer
        ? (() => {
            try {
              return new URL(referrer).hostname
            } catch {
              return 'direct'
            }
          })()
        : null

      await dailyRef.set({
        projectId,
        date: dateKey,
        pageviews: 1,
        fingerprints: [fingerprint],
        topPages: { [path.replace(/\//g, '__').replace(/\./g, '_')]: 1 },
        referrers: refDomain ? { [refDomain.replace(/\./g, '_')]: 1 } : {},
        browsers: { [browser]: 1 },
        devices: { [deviceType]: 1 },
        countries: geo.country ? { [geo.country]: 1 } : {},
        sessions: 1
      })
    }

    // 4. Security detection (awaited to prevent serverless early termination)
    await detectSecurityEvents(db, projectId, path, referrer, fingerprint, browser, geo, ua, security).catch(() => {})

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[analytics]', message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
