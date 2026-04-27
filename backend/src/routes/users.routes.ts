import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, UsersController.getMe);
router.put("/me", authMiddleware, UsersController.updateMe);
router.get("/:id/listings", UsersController.getUserListings);

export default router;
