import { Router } from "express";
import { HandoverService } from "../services/handover.service";
import { validate } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { z } from "zod";

const router = Router();

// We are allowing anyone to submit an alert initially as per requirements
// (or they can supply their userId if logged in)
const alertSchema = z.object({
  body: z.object({
    userId: z.string().nullable().optional(),
    email: z.string().email(),
    phone: z.string().min(10),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    preferredLocation: z.string().min(1),
    apartmentType: z.string().min(1),
    yearlyBudgetRange: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative()
    }),
    moveInTimeline: z.string().min(1),
    specificAreas: z.string().optional()
  })
});

router.post("/alert", validate(alertSchema), async (req, res) => {
  try {
    const alert = await HandoverService.saveAlert(req.body);
    res.status(201).json({ success: true, data: alert });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin only (basic auth check for now)
router.get("/alerts", authMiddleware, async (req, res) => {
  try {
    // In a real app, verify admin role here
    const alerts = await HandoverService.getAllAlerts();
    res.json({ success: true, data: alerts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
