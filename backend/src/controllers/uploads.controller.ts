import { Request, Response, NextFunction } from "express";
import { UploadsService } from "../services/uploads.service";

export class UploadsController {
  static async uploadImages(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || (req.files as any).length === 0) {
        return res.status(400).json({ success: false, error: "No images uploaded" });
      }

      const urls = await UploadsService.uploadImages(req.files as Express.Multer.File[]);
      res.status(200).json({ success: true, data: urls });
    } catch (error) {
      next(error);
    }
  }
}
