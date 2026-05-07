import { Router } from "express";
import { SavedSearchesService } from "../services/saved-searches.service";
import { validate } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { z } from "zod";

const router = Router();

// Ensure auth protects this whole router
router.use(authMiddleware);

const createSearchSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    filters: z.any(),
    alertEnabled: z.boolean().optional()
  })
});

router.post("/", validate(createSearchSchema), async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    const search = await SavedSearchesService.saveSearch(userId, req.body);
    res.status(201).json({ success: true, data: search });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    const searches = await SavedSearchesService.getUserSearches(userId);
    res.json({ success: true, data: searches });
  } catch (error: any) {
    console.error("Saved searches error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    await SavedSearchesService.deleteSearch(userId, req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const toggleSchema = z.object({
  body: z.object({
    alertEnabled: z.boolean()
  })
});

router.put("/:id/toggle", validate(toggleSchema), async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    const { alertEnabled } = req.body;
    const search = await SavedSearchesService.toggleAlert(userId, req.params.id, alertEnabled);
    res.json({ success: true, data: search });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
