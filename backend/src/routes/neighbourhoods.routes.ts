import { Router } from "express";
import { NeighbourhoodsController } from "../controllers/neighbourhoods.controller";

const router = Router();

router.get("/", NeighbourhoodsController.getNeighbourhoods);
router.get("/:id", NeighbourhoodsController.getNeighbourhood);

export default router;
