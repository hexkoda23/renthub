import cron from "node-cron";
import { JijiService } from "../services/jiji.service";
import { runAlertCheck } from "./alertChecker";

export const initJijiSync = () => {
  // Run every 6 hours: "0 */6 * * *"
  cron.schedule("0 */6 * * *", async () => {
    console.log("[CRON] Starting Jiji listings sync...");
    try {
      const result = await JijiService.fetchAndSync();
      if (result.success) {
        console.log(`[CRON] Jiji sync completed. Added/Updated: ${result.added}`);
        // Trigger alert check immediately so users get notified of new Jiji matches
        await runAlertCheck();
      } else {
        console.warn(`[CRON] Jiji sync skipped: ${result.message}`);
      }
    } catch (error) {
      console.error("[CRON] Jiji sync failed:", error);
    }
  });

  console.log("Jiji sync cron job initialized (runs every 6 hours).");
};
