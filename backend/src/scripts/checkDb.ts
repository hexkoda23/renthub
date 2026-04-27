import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "C:/Users/Hp/Documents/renthub-main/.env" });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = admin.firestore();

async function checkDatabase() {
  try {
    console.log("🔍 Checking Firestore database...");
    const collections = await db.listCollections();
    console.log("✅ Connection successful. Collections found:", collections.length);
  } catch (error: any) {
    console.error("❌ Database check failed:", error.message);
    if (error.code === 5) {
      console.error("💡 Tip: Ensure you have created a Firestore database in the Firebase Console for project:", process.env.FIREBASE_PROJECT_ID);
    }
  }
}

checkDatabase();