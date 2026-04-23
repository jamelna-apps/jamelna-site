import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

function getFirestoreDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT || '', 'base64').toString()
    );
    initializeApp({ credential: cert(serviceAccount as ServiceAccount) });
  }
  return getFirestore();
}

/**
 * Custom event endpoint.
 * Body: { projectId, eventName, eventProps, sessionId, path, timestamp }
 * Writes to Firestore `custom_events` collection.
 * Silently swallows errors so analytics never breaks the app.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { projectId, eventName, eventProps, sessionId, path, timestamp } = body;

    if (!projectId || !eventName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getFirestoreDb();
    await db.collection('custom_events').add({
      projectId,
      eventName,
      eventProps: eventProps ?? {},
      sessionId: sessionId ?? null,
      path: path ?? null,
      timestamp: timestamp ?? new Date().toISOString(),
    });

    // Also update daily event counts
    const dateKey = (timestamp ?? new Date().toISOString()).split('T')[0];
    const dailyRef = db.collection('custom_events_daily').doc(`${projectId}_${dateKey}`);
    await dailyRef.set(
      {
        projectId,
        date: dateKey,
        [`events.${eventName}`]: FieldValue.increment(1),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    // Silent fail — never break the app due to analytics
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
