import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

function getFirestoreDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT || '', 'base64').toString()
    )
    initializeApp({ credential: cert(serviceAccount as ServiceAccount) })
  }
  return getFirestore()
}

export async function handleSecurityEvent(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await req.json()
    const { projectId, type, detail, path } = body

    const VALID_TYPES = new Set(['path_probe', 'attack_pattern', 'bot_detected', 'csp_violation', 'client_error', 'rate_limit'])
    if (!projectId || !type || !VALID_TYPES.has(type)) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    const db = getFirestoreDb()
    const timestamp = new Date().toISOString()
    const dateKey = timestamp.split('T')[0]

    // Write raw event
    await db.collection('security_events').add({
      projectId,
      type,
      severity: type === 'client_error' ? 'low' : 'medium',
      detail: String(detail).slice(0, 500),
      path: path || null,
      fingerprint: null,
      country: null,
      region: null,
      city: null,
      timestamp
    })

    // Update daily aggregation
    const dailyRef = db.collection('security_daily').doc(`${projectId}_${dateKey}`)
    const snap = await dailyRef.get()

    if (snap.exists) {
      await dailyRef.update({
        totalEvents: FieldValue.increment(1),
        [`eventsByType.${type}`]: FieldValue.increment(1)
      })
    } else {
      await dailyRef.set({
        projectId,
        date: dateKey,
        totalEvents: 1,
        highSeverityCount: 0,
        eventsByType: { [type]: 1 },
        topProbePaths: {},
        topFingerprints: {},
        topCountries: {}
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true }) // Silent fail
  }
}
