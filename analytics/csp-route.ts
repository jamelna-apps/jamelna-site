import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { getAnalyticsDb } from '@/lib/firebase/analytics-admin'

export async function handleCspReport(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const report = body['csp-report'] || body

    const projectId = req.headers.get('x-project-id') || req.nextUrl.searchParams.get('projectId') || 'unknown'
    const db = getAnalyticsDb()
    const timestamp = new Date().toISOString()
    const dateKey = timestamp.split('T')[0]

    await db.collection('security_events').add({
      projectId,
      type: 'csp_violation',
      severity: 'medium',
      detail: `CSP violation: ${report['violated-directive'] || report.violatedDirective || 'unknown'} blocked ${report['blocked-uri'] || report.blockedURL || 'unknown'}`,
      path: report['document-uri'] || report.documentURL || null,
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
        ['eventsByType.csp_violation']: FieldValue.increment(1)
      })
    } else {
      await dailyRef.set({
        projectId,
        date: dateKey,
        totalEvents: 1,
        highSeverityCount: 0,
        eventsByType: { csp_violation: 1 },
        topProbePaths: {},
        topFingerprints: {},
        topCountries: {}
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true }) // Always 200 for CSP reports
  }
}
