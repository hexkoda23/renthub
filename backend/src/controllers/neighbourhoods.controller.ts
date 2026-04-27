import { Request, Response, NextFunction } from "express";
import { NeighbourhoodsService } from "../services/neighbourhoods.service";

export class NeighbourhoodsController {
  static async getNeighbourhoods(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await NeighbourhoodsService.getAll();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getNeighbourhood(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await NeighbourhoodsService.getById(req.params.id);
      if (!data) return res.status(404).json({ success: false, error: "Neighbourhood not found" });
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
