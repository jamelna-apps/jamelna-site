import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import type { AnalyticsPayload, GeoData } from './types'

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
      timezone
    } = body

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
        [`topPages.${path.replace(/\//g, '__')}`]: FieldValue.increment(1),
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
        topPages: { [path.replace(/\//g, '__')]: 1 },
        referrers: refDomain ? { [refDomain.replace(/\./g, '_')]: 1 } : {},
        browsers: { [browser]: 1 },
        devices: { [deviceType]: 1 },
        countries: geo.country ? { [geo.country]: 1 } : {},
        sessions: 1
      })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[analytics]', message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
