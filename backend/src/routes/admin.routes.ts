import { Router } from "express";
import { JijiService } from "../services/jiji.service";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Manual Jiji sync (Admin only)
router.post("/sync-jiji", authMiddleware, async (req, res) => {
  try {
    const userEmail = (req as any).user?.email;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!userEmail || userEmail !== adminEmail) {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden: Admin access required" 
      });
    }

    const result = await JijiService.fetchAndSync();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
