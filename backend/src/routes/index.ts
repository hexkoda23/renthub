import { Router } from "express";
import listingsRoutes from "./listings.routes";
import aiRoutes from "./ai.routes";
import usersRoutes from "./users.routes";
import neighbourhoodsRoutes from "./neighbourhoods.routes";
import uploadsRoutes from "./uploads.routes";

import handoverRoutes from "./handover.routes";
import enquiriesRoutes from "./enquiries.routes";
import savedSearchesRoutes from "./saved-searches.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/listings", listingsRoutes);
router.use("/ai", aiRoutes);
router.use("/users", usersRoutes);
router.use("/neighbourhoods", neighbourhoodsRoutes);
router.use("/uploads", uploadsRoutes);
router.use("/handover", handoverRoutes);
router.use("/enquiries", enquiriesRoutes);
router.use("/saved-searches", savedSearchesRoutes);
router.use("/admin", adminRoutes);

export default router;
