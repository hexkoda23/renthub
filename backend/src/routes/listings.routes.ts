import { Router } from "express";
import { ListingsController } from "../controllers/listings.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { z } from "zod";

const router = Router();

const listingSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    price: z.number().positive(),
    type: z.enum(["flat", "duplex", "self-contain", "room", "bungalow", "mansion"]),
    state: z.string(),
    city: z.string(),
    address: z.string(),
    bedrooms: z.number().int().nonnegative(),
    bathrooms: z.number().int().nonnegative(),
    amenities: z.array(z.string()),
    images: z.array(z.string().url()).min(1),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    // Nigerian-specific fields (all optional)
    electricityBand: z.enum(["band-a", "band-b", "band-c", "band-d", "none"]).optional(),
    waterSituation: z.enum(["running", "not-running", "none"]).optional(),
    parkingSituation: z.enum(["compound", "nearby", "street", "none"]).optional(),
    listingPurpose: z.enum(["rent", "sale", "shortlet"]).optional(),
    rentFrequency: z.enum(["monthly", "yearly"]).optional(),
    yearlyPrice: z.number().positive().optional(),
    propertyCondition: z.enum(["newly-built", "renovated", "old-but-clean", "needs-work"]).optional(),
    estateName: z.string().optional(),
    landTitle: z.enum(["c-of-o", "r-of-o", "excision", "deed-of-assignment", "none"]).nullable().optional(),
    isNegotiable: z.boolean().optional(),
    agentFee: z.number().nonnegative().nullable().optional(),
    cautionFee: z.number().nonnegative().nullable().optional(),
    agreementFee: z.number().nonnegative().nullable().optional(),
    listingType: z.enum(["owner", "agent"]).optional(),
    packOutDate: z.string().nullable().optional(),
    isHandoverListing: z.boolean().optional(),
  }),
});

// Public routes
router.get("/", ListingsController.getListings);
router.get("/search", ListingsController.searchListings);
router.get("/:id", ListingsController.getListing);

// Protected routes
router.post("/", authMiddleware, validate(listingSchema), ListingsController.createListing);
router.put("/:id", authMiddleware, validate(listingSchema.partial()), ListingsController.updateListing);
router.delete("/:id", authMiddleware, ListingsController.deleteListing);

export default router;
