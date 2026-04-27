import { Router } from "express";
import { AIController } from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { aiLimiter } from "../config/rateLimit";
import { validate } from "../middleware/validate.middleware";
import { z } from "zod";

const router = Router();

const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1),
    conversationId: z.string().optional(),
  }),
});

router.post("/chat", authMiddleware, aiLimiter, validate(chatSchema), AIController.chat);
router.get("/conversations", authMiddleware, AIController.getConversations);
router.delete("/conversations/:id", authMiddleware, AIController.deleteConversation);

export default router;
