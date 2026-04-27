import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";

export class UsersController {
  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.getById((req as any).user.uid);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.update((req as any).user.uid, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async getUserListings(req: Request, res: Response, next: NextFunction) {
    try {
      const listings = await UsersService.getUserListings(req.params.id);
      res.status(200).json({ success: true, data: listings });
    } catch (error) {
      next(error);
    }
  }
}
