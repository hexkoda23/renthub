import admin from "firebase-admin";
import { env } from "./env";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } catch (error: any) {
    console.warn("Firebase Admin Initialization Warning: " + error.message);
    console.warn("Please ensure your FIREBASE_PRIVATE_KEY is a valid JSON-escaped PEM string in your .env if you plan to use Firebase features.");
  }
}

let authObj = {} as any;
let dbObj = {} as any;
let storageObj = {} as any;

if (admin.apps.length > 0) {
  authObj = admin.auth();
  dbObj = admin.firestore();
  storageObj = admin.storage();
}

export const auth = authObj;
export const db = dbObj;
export const storage = storageObj;
