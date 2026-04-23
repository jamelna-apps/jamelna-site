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
 * Allowlist of valid event names for the ai-true-cost feature.
 * Any name not in this set is rejected with 400.
 */
const ALLOWED_EVENTS = new Set([
  'scenario_picked',
  'share_clicked',
  'methodology_viewed',
  'challenge_clicked',
]);

/**
 * Bot UA pattern — mirrors the one in analytics/api-route.ts.
 * Requests from bots are silently ignored (200) without writing to Firestore.
 */
const BOT_UA = /bot|crawl|spider|headless|phantom|selenium|puppeteer|playwright|wget|curl|scrapy|python-requests|go-http-client|ahrefsbot|semrushbot|dotbot|mj12bot/i;

/**
 * Strip characters that are invalid or unsafe in Firestore field paths.
 * Covers dots (`.`), slashes (`/`), tildes (`~`), asterisks (`*`), and brackets.
 */
function sanitizeFieldName(name: string): string {
  return name.replace(/[./~*[\]]/g, '_');
}

/**
 * Custom event endpoint.
 * Body: { projectId, eventName, eventProps, sessionId, path, timestamp }
 * Writes to Firestore `custom_events` collection.
 * Silently swallows errors so analytics never breaks the app.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Skip bot traffic — return 200 without writing.
  const ua = req.headers.get('user-agent') ?? '';
  if (BOT_UA.test(ua)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const body = await req.json();
    const { projectId, eventName, eventProps, sessionId, path, timestamp } = body;

    if (!projectId || !eventName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Allowlist check — reject unknown event names outright.
    if (!ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ error: 'Unknown event' }, { status: 400 });
    }

    // Sanitize the event name before using it as a Firestore field path.
    // The allowlist guarantees safe names, but this is belt-and-suspenders.
    const safeEventName = sanitizeFieldName(eventName);

    const db = getFirestoreDb();
    await db.collection('custom_events').add({
      projectId,
      eventName: safeEventName,
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
        [`events.${safeEventName}`]: FieldValue.increment(1),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    // Silent fail — never break the app due to analytics
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
