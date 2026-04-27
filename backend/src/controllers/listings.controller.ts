import { Request, Response, NextFunction } from "express";
import { ListingsService } from "../services/listings.service";
import { paginate } from "../utils/helpers";
import admin from "firebase-admin";

const MOCK_LISTINGS = [
  {
    id: "mock-1",
    title: "Luxury 3 Bedroom Flat in Lekki Phase 1",
    description: "Beautifully finished 3 bedroom apartment with BQ, swimming pool, and gym. Located in the heart of Lekki Phase 1 with easy access to major roads and shopping centers. 24/7 power supply and excellent security.",
    price: 4500000,
    address: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    lga: "Eti-Osa",
    type: "flat",
    bathrooms: 3,
    bedrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Swimming Pool", "Gym", "Security", "Prepaid Meter", "Inverter", "CCTV", "Boys Quarters (BQ)", "Air Conditioning"],
    verified: true,
    landlordId: "agent-001",
    status: "active",
    views: 234,
    createdAt: new Date().toISOString(),
    coordinates: { lat: 6.4541, lng: 3.4763 },
    // Nigerian-specific
    electricityBand: "band-a",
    waterSituation: "running",
    parkingSituation: "compound",
    listingPurpose: "rent",
    rentFrequency: "yearly",
    yearlyPrice: 4500000,
    propertyCondition: "newly-built",
    estateName: "Lekki Gardens Estate",
    landTitle: null,
    isNegotiable: true,
    agentFee: 450000,
    cautionFee: 300000,
    agreementFee: 150000,
    listingType: "agent",
    packOutDate: null,
    isHandoverListing: false,
  },
  {
    id: "mock-2",
    title: "Modern Duplex in Maitama",
    description: "High-end duplex with serene environment and top security. Features spacious rooms, modern kitchen, and beautiful garden. Located in Maitama, the diplomatic zone of Abuja.",
    price: 12000000,
    address: "Maitama District",
    city: "Abuja",
    state: "FCT",
    lga: "Municipal",
    type: "duplex",
    bathrooms: 4,
    bedrooms: 4,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Security", "Parking", "Running Water", "Generator", "Borehole", "Fenced Yard", "POP Ceiling"],
    verified: true,
    landlordId: "owner-002",
    status: "active",
    views: 156,
    createdAt: new Date().toISOString(),
    coordinates: { lat: 9.0820, lng: 7.4917 },
    // Nigerian-specific
    electricityBand: "band-b",
    waterSituation: "running",
    parkingSituation: "compound",
    listingPurpose: "rent",
    rentFrequency: "yearly",
    yearlyPrice: 12000000,
    propertyCondition: "renovated",
    estateName: "",
    landTitle: "c-of-o",
    isNegotiable: false,
    agentFee: null,
    cautionFee: 500000,
    agreementFee: 200000,
    listingType: "owner",
    packOutDate: null,
    isHandoverListing: false,
  },
  {
    id: "mock-3",
    title: "Cozy Self-Contain in Yaba",
    description: "Clean and affordable self-contained apartment in the heart of Yaba. Close to University of Lagos and Yaba Tech. Perfect for students and young professionals.",
    price: 350000,
    address: "Herbert Macaulay Way, Yaba",
    city: "Lagos",
    state: "Lagos",
    lga: "Yaba",
    type: "self-contain",
    bathrooms: 1,
    bedrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Prepaid Meter", "Tiled Floor", "POP Ceiling"],
    verified: false,
    landlordId: "owner-003",
    status: "active",
    views: 89,
    createdAt: new Date().toISOString(),
    coordinates: { lat: 6.5095, lng: 3.3711 },
    electricityBand: "band-c",
    waterSituation: "not-running",
    parkingSituation: "street",
    listingPurpose: "rent",
    rentFrequency: "yearly",
    yearlyPrice: 350000,
    propertyCondition: "old-but-clean",
    estateName: "",
    landTitle: null,
    isNegotiable: true,
    agentFee: null,
    cautionFee: null,
    agreementFee: 50000,
    listingType: "owner",
    packOutDate: "2026-06-30",
    isHandoverListing: true,
  }
];

export class ListingsController {
  static async getListings(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, ...filters } = req.query;
      const pagination = paginate(Number(page) || 1, Number(limit) || 10);
      
      let listings;
      if (admin.apps.length > 0) {
        listings = await ListingsService.getAll(filters, pagination);
      } else {
        console.log("🛠️ Returning mock listings (Firebase not initialized)");
        listings = MOCK_LISTINGS;
      }
      
      res.status(200).json({
        success: true,
        data: listings,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getListing(req: Request, res: Response, next: NextFunction) {
    try {
      let listing;
      if (admin.apps.length > 0) {
        listing = await ListingsService.getById(req.params.id);
      } else {
        listing = MOCK_LISTINGS.find(l => l.id === req.params.id);
      }
      if (!listing) return res.status(404).json({ success: false, error: "Listing not found" });
      res.status(200).json({ success: true, data: listing });
    } catch (error) {
      next(error);
    }
  }

  static async createListing(req: Request, res: Response, next: NextFunction) {
    try {
      // For testing, fallback to mock id if user is undefined
      const landlordId = (req as any).user?.uid || "mock-user-123";
      const data = { ...req.body, landlordId };
      const listing = await ListingsService.create(data);
      
      // Attempt to notify matching seekers
      if (listing.isHandoverListing) {
        // Fire and forget (don't await so we don't block the response)
        const { HandoverService } = await import("../services/handover.service");
        HandoverService.matchAndNotify(listing as any).catch(err => {
          console.error("Failed to process handover notifications", err);
        });
      }

      res.status(201).json({ success: true, data: listing });
    } catch (error) {
      next(error);
    }
  }

  static async updateListing(req: Request, res: Response, next: NextFunction) {
    try {
      // Owners check could be added here
      const listing = await ListingsService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: listing });
    } catch (error) {
      next(error);
    }
  }

  static async deleteListing(req: Request, res: Response, next: NextFunction) {
    try {
      await ListingsService.delete(req.params.id);
      res.status(200).json({ success: true, message: "Listing deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async searchListings(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      const listings = await ListingsService.search(String(q));
      res.status(200).json({ success: true, data: listings });
    } catch (error) {
      next(error);
    }
  }
}
