import { db } from "../config/firebase";
import { Listing, PropertyType } from "@renthub/shared";

const COLLECTION = "listings";

export class JijiService {
  static async fetchAndSync() {
    const token = process.env.APIFY_API_TOKEN;
    if (!token) {
      console.warn("APIFY_API_TOKEN is not set. Skipping Jiji sync.");
      return { success: false, message: "APIFY_API_TOKEN is not set" };
    }

    const API_URL = `https://api.apify.com/v2/acts/stealth_mode~jiji-product-search-scraper/run-sync-get-dataset-items?token=${token}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchTerms: [
            "houses for rent Lagos", 
            "apartments for rent Abuja", 
            "houses for rent Port Harcourt", 
            "houses for rent Ibadan"
          ],
          maxResults: 100
        }),
      });

      if (!response.ok) {
        throw new Error(`Apify request failed with status ${response.status}`);
      }

      const items: any[] = await response.json();
      console.log(`Fetched ${items.length} items from Jiji/Apify`);

      const batch = db.batch();
      let added = 0;
      let updated = 0;

      for (const item of items) {
        const externalId = item.id;
        if (!externalId) continue;

        const docId = `jiji_${externalId}`;
        const docRef = db.collection(COLLECTION).doc(docId);
        
        const listingData: Listing = {
          id: docId,
          title: item.title,
          description: item.description || "",
          price: this.parseNairaPrice(item.price),
          type: this.mapJijiCategory(item.category),
          bedrooms: this.extractBedrooms(item.title + " " + (item.description || "")),
          bathrooms: 0,
          state: item.state || this.extractState(item.location),
          city: item.city || item.location || "",
          lga: "",
          address: item.location || "",
          coordinates: { lat: 0, lng: 0 },
          images: item.images || (item.imageUrl ? [item.imageUrl] : []),
          amenities: [],
          landlordId: "jiji_external",
          status: "active",
          verified: false,
          views: 0,
          createdAt: item.createdAt || new Date().toISOString(),
          source: "jiji",
          externalUrl: item.url,
          externalId: String(item.id),
          isHandoverListing: false,
          listingType: "agent",
          listingPurpose: "rent"
        };

        batch.set(docRef, listingData, { merge: true });
        added++; // For simplicity, treating everything as added/updated
      }

      await batch.commit();
      console.log(`Successfully synced ${added} Jiji listings to Firestore.`);
      
      return { success: true, added, updated };
    } catch (error) {
      console.error("Error syncing Jiji listings:", error);
      throw error;
    }
  }

  private static parseNairaPrice(priceStr: any): number {
    if (!priceStr) return 0;
    if (typeof priceStr === "number") return priceStr;
    const cleaned = String(priceStr).replace(/[₦, \s]/g, "");
    return parseFloat(cleaned) || 0;
  }

  private static mapJijiCategory(category: string): PropertyType {
    if (!category) return "flat";
    const cat = category.toLowerCase();
    if (cat.includes("self contain")) return "self-contain";
    if (cat.includes("flat") || cat.includes("apartment")) return "flat";
    if (cat.includes("duplex")) return "duplex";
    if (cat.includes("room")) return "room";
    if (cat.includes("bungalow")) return "bungalow";
    if (cat.includes("mansion")) return "mansion";
    return "flat";
  }

  private static extractBedrooms(text: string): number {
    const match = text.match(/(\d+)\s*bed/i);
    return match ? parseInt(match[1]) : 1;
  }

  private static extractState(location: string): string {
    if (!location) return "Lagos";
    const parts = location.split(",");
    return parts[parts.length - 1].trim();
  }
}
