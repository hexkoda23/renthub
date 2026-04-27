import { Router } from "express";
import { EnquiriesService } from "../services/enquiries.service";
import { validate } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { z } from "zod";

const router = Router();

const enquirySchema = z.object({
  body: z.object({
    listingId: z.string().min(1),
    landlordId: z.string().min(1),
    senderName: z.string().min(2),
    senderEmail: z.string().email(),
    senderPhone: z.string().min(10),
    message: z.string().min(10)
  })
});

// Submit a new enquiry
router.post("/", validate(enquirySchema), async (req, res) => {
  try {
    const enquiry = await EnquiriesService.submitEnquiry(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get enquiries for the logged in landlord
router.get("/", authMiddleware, async (req, res) => {
  try {
    const landlordId = (req as any).user.uid;
    const enquiries = await EnquiriesService.getLandlordEnquiries(landlordId);
    res.json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
