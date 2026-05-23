import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const ANALYTICS_APP_NAME = "analytics-gyst";

let cachedApp: App | undefined;
let cachedDb: Firestore | undefined;

function getAnalyticsApp(): App {
  if (cachedApp) return cachedApp;

  const existing = getApps().find((a) => a.name === ANALYTICS_APP_NAME);
  if (existing) {
    cachedApp = existing;
    return existing;
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT not configured (needed for analytics — must be gyst-17bf8 service account)"
    );
  }

  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString()
  );

  cachedApp = initializeApp(
    { credential: cert(serviceAccount) },
    ANALYTICS_APP_NAME
  );
  return cachedApp;
}

export function getAnalyticsDb(): Firestore {
  if (!cachedDb) cachedDb = getFirestore(getAnalyticsApp());
  return cachedDb;
}
