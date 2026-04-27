import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config({ path: require("path").resolve(__dirname, "../../.env") });

import { JijiService } from "../services/jiji.service";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

async function triggerSync() {
  console.log("🔄 Starting manual Jiji sync...");
  try {
    const result = await JijiService.fetchAndSync();
    if (result.success) {
      console.log(`✅ Sync completed! Added: ${result.added}, Updated: ${result.updated}`);
    } else {
      console.warn(`⚠️ Sync skipped: ${result.message}`);
    }
  } catch (error) {
    console.error("❌ Sync failed:", error);
  } finally {
    process.exit(0);
  }
}

triggerSync();