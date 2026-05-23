import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

const ADMIN_APP_NAME = 'jamelna-admin';

// Initialize Firebase Admin (server-side only)
let adminApp: App | undefined;
let adminDb: Firestore | undefined;
let adminAuth: Auth | undefined;

function getServiceAccount() {
  // Can use either a JSON file or individual env variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
}

export function getAdminApp(): App {
  if (adminApp) return adminApp;

  const existing = getApps().find((a) => a.name === ADMIN_APP_NAME);
  if (existing) {
    adminApp = existing;
    return existing;
  }

  adminApp = initializeApp(
    {
      credential: cert(getServiceAccount()),
      projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    },
    ADMIN_APP_NAME
  );
  return adminApp;
}

export function getAdminFirestore(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    adminAuth = getAuth(getAdminApp());
  }
  return adminAuth;
}
