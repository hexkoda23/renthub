import { Request, Response, NextFunction } from "express";
import { AIService } from "../services/ai.service";

export class AIController {
  static async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, conversationId } = req.body;
      const userId = (req as any).user.uid;
      
      const response = await AIService.getChatResponse(userId, message, conversationId);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.uid;
      const conversations = await AIService.getUserConversations(userId);
      res.status(200).json({ success: true, data: conversations });
    } catch (error) {
      next(error);
    }
  }

  static async deleteConversation(req: Request, res: Response, next: NextFunction) {
    try {
      await AIService.deleteConversation(req.params.id);
      res.status(200).json({ success: true, message: "Conversation deleted" });
    } catch (error) {
      next(error);
    }
  }
}
