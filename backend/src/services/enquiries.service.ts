import { db } from "../config/firebase";

export interface Enquiry {
  id?: string;
  listingId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  landlordId: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

export class EnquiriesService {
  private static enquiriesCollection = db.collection("enquiries");
  private static usersCollection = db.collection("users");
  private static listingsCollection = db.collection("listings");

  static async submitEnquiry(enquiryData: Omit<Enquiry, "id" | "createdAt" | "status">) {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const docRef = await this.enquiriesCollection.add(newEnquiry);
    
    // Attempt to notify landlord via email
    await this.notifyLandlord(newEnquiry);
    
    return { id: docRef.id, ...newEnquiry };
  }

  private static async notifyLandlord(enquiry: Enquiry) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not set. Skipping enquiry email.");
      return;
    }

    try {
      // Get landlord details to find email
      let landlordEmail = "";
      
      // If landlordId matches our mock patterns
      if (enquiry.landlordId.includes("mock-") || enquiry.landlordId.includes("owner-") || enquiry.landlordId.includes("agent-")) {
          // Send to a test email or the sender email if testing
          landlordEmail = "landlord-test@renthob.local";
      } else {
          const userDoc = await this.usersCollection.doc(enquiry.landlordId).get();
          if (userDoc.exists) {
            landlordEmail = userDoc.data()?.email;
          }
      }

      if (!landlordEmail) return;

      // In real scenario we'd get listing title too, just using ID for now
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "RentHob Enquiries <onboarding@resend.dev>",
          to: landlordEmail.includes("renthob.local") ? "delivered@resend.dev" : landlordEmail,
          subject: `New Prospect for property: ${enquiry.listingId.slice(-6)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; rounded: 12px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #6366f1; margin: 0;">RentHob</h1>
                <p style="color: #666; font-size: 14px;">Elevating Nigerian Real Estate</p>
              </div>
              
              <h2 style="color: #111; font-size: 20px; margin-bottom: 20px;">You have a new enquiry!</h2>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                <p style="margin: 0 0 10px 0;"><strong>Prospect Name:</strong> ${enquiry.senderName}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${enquiry.senderEmail}</p>
                <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${enquiry.senderPhone}</p>
                <p style="margin: 15px 0 5px 0;"><strong>Message:</strong></p>
                <p style="margin: 0; color: #444; font-style: italic;">"${enquiry.message}"</p>
              </div>
              
              <div style="border-top: 1px solid #eee; pt: 20px; text-align: center;">
                <p style="color: #888; font-size: 12px;">Property Ref: ${enquiry.listingId}</p>
                <p style="color: #333; font-size: 14px; margin-top: 20px;">
                  Please reply to this prospect directly via their email or phone.
                </p>
                <a href="mailto:${enquiry.senderEmail}" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">Reply via Email</a>
              </div>
            </div>
          `
        }),
      });
    } catch (err) {
      console.error(`Failed to send enquiry email`, err);
    }
  }

  // Get enquiries for a specific landlord
  static async getLandlordEnquiries(landlordId: string) {
    const snapshot = await this.enquiriesCollection
      .where("landlordId", "==", landlordId)
      .orderBy("createdAt", "desc")
      .get();
      
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...(doc.data() as Enquiry) }));
  }
}
