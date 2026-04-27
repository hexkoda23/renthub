import { Router } from "express";
import { UploadsController } from "../controllers/uploads.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/images", authMiddleware, upload.array("images", 10), UploadsController.uploadImages);

export default router;
