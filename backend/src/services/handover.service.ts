import { db } from "../config/firebase";
import { Listing } from "@renthob/shared";

// We define the type locally or we could put it in @renthob/shared
export interface HandoverAlert {
  id?: string;
  userId: string | null;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  preferredLocation: string;
  apartmentType: string;
  yearlyBudgetRange: { min: number; max: number };
  moveInTimeline: string;
  specificAreas?: string;
  isActive: boolean;
  createdAt: string;
  matchedListingIds: string[];
}

export class HandoverService {
  private static alertsCollection = db.collection("handoverAlerts");

  static async saveAlert(alertData: Omit<HandoverAlert, "id" | "createdAt" | "matchedListingIds" | "isActive">) {
    const newAlert: HandoverAlert = {
      ...alertData,
      isActive: true,
      createdAt: new Date().toISOString(),
      matchedListingIds: [],
    };

    const docRef = await this.alertsCollection.add(newAlert);
    return { id: docRef.id, ...newAlert };
  }

  static async getAllAlerts() {
    const snapshot = await this.alertsCollection.orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...(doc.data() as HandoverAlert) }));
  }

  static async matchAndNotify(listing: Listing) {
    if (!listing.isHandoverListing) return;

    const snapshot = await this.alertsCollection.where("isActive", "==", true).get();
    const alerts = snapshot.docs.map((doc: any) => ({ id: doc.id, ...(doc.data() as HandoverAlert) }));

    const matchedAlerts = alerts.filter((alert: HandoverAlert) => {
      // Very basic matching logic
      const budgetMatches = (!listing.yearlyPrice && !listing.price) || 
        ((listing.yearlyPrice || listing.price) >= alert.yearlyBudgetRange.min && 
         (listing.yearlyPrice || listing.price) <= alert.yearlyBudgetRange.max);
      
      const typeMatches = alert.apartmentType === "flexible" || 
        listing.type === alert.apartmentType ||
        (alert.apartmentType === "mini-flat" && listing.type === "flat" && listing.bedrooms === 1);

      // In a real scenario we'd do smart location matching (Mainland vs Island, etc.)
      // For now, if the preferred location is in the string, or it's 'both', or they match state
      const locationMatches = alert.preferredLocation === "both" || 
        listing.state.toLowerCase().includes(alert.preferredLocation.toLowerCase()) || 
        listing.city.toLowerCase().includes(alert.preferredLocation.toLowerCase());

      return budgetMatches && typeMatches && locationMatches;
    });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not set. Skipping email notifications.");
      return matchedAlerts;
    }

    for (const alert of matchedAlerts) {
      if (alert.matchedListingIds.includes(listing.id)) continue;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: "RentHob Handover <onboarding@resend.dev>", // onboarding address for resend testing
            to: alert.email,
            subject: "A new handover apartment matched your search!",
            text: `Hi ${alert.firstName},

A verified handover apartment matching your search just dropped on RentHob.

Details:
Title: ${listing.title}
Price: ₦${listing.yearlyPrice || listing.price}
Location: ${listing.city}, ${listing.state}

Act fast, these places don't sit around for long:
${process.env.CLIENT_URL}/listings/${listing.id}

Best,
RentHob Team`,
          }),
        });

        // Update matched array to prevent double-sending
        await this.alertsCollection.doc(alert.id!).update({
          matchedListingIds: [...alert.matchedListingIds, listing.id]
        });
      } catch (err) {
        console.error(`Failed to send email to ${alert.email}`, err);
      }
    }

    return matchedAlerts;
  }
}
