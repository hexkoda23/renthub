import cron from "node-cron";
import { db } from "../config/firebase";

export const runAlertCheck = async () => {
  console.log("Running saved searches alert checker...");
  try {
    const savedSearchesRef = db.collection("savedSearches");
    const listingsRef = db.collection("listings");
    const usersRef = db.collection("users");

    const snapshot = await savedSearchesRef.where("alertEnabled", "==", true).get();
    if (snapshot.empty) return;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set. Cannot send search alerts.");
      return;
    }

    for (const doc of snapshot.docs) {
      const search = doc.data();
      const lastChecked = new Date(search.lastChecked || search.createdAt);
      const filters = search.filters || {};
      
      // Find listings created after lastChecked
      let query: FirebaseFirestore.Query = listingsRef
        .where("createdAt", ">", lastChecked.toISOString())
        .orderBy("createdAt", "desc");

      const recentListingsSnapshot = await query.get();
      
      let newMatches = 0;

      for (const listingDoc of recentListingsSnapshot.docs) {
        const listing = listingDoc.data();
        let isMatch = true;

        if (filters.state && listing.state !== filters.state) isMatch = false;
        if (filters.city && listing.city !== filters.city) isMatch = false;
        if (filters.type && listing.type !== filters.type) isMatch = false;
        if (filters.bedrooms && listing.bedrooms < parseInt(filters.bedrooms)) isMatch = false;
        if (filters.listingPurpose && listing.listingPurpose !== filters.listingPurpose) isMatch = false;
        
        if (filters.minPrice && (listing.price || listing.yearlyPrice) < parseFloat(filters.minPrice)) isMatch = false;
        if (filters.maxPrice && (listing.price || listing.yearlyPrice) > parseFloat(filters.maxPrice)) isMatch = false;

        if (isMatch) newMatches++;
      }

      if (newMatches > 0) {
        // Notify the user
        const userDoc = await usersRef.doc(search.userId).get();
        const userEmail = userDoc.data()?.email;

        if (userEmail) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              from: "RentHub Alerts <onboarding@resend.dev>",
              to: userEmail.includes("renthub.local") ? "delivered@resend.dev" : userEmail,
              subject: `✨ New property matches: ${search.name}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 20px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #6366f1; margin: 0;">RentHub</h1>
                    <p style="color: #666; font-size: 14px;">Marketplace & Handover Network</p>
                  </div>
                  
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: inline-block; background-color: #e0e7ff; color: #6366f1; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 12px; margin-bottom: 10px;">
                      SAVED SEARCH ALERT
                    </div>
                    <h2 style="color: #111; font-size: 24px; margin: 0;">We found ${newMatches} new matches!</h2>
                    <p style="color: #555; margin-top: 10px;">Your search "<strong>${search.name}</strong>" just got hits.</p>
                  </div>
                  
                  <div style="border-top: 1px solid #eee; pt: 30px; text-align: center;">
                    <a href="http://localhost:5173/dashboard" style="display: inline-block; background-color: #6366f1; color: white; padding: 15px 35px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px;">View New Listings</a>
                    <p style="color: #888; font-size: 12px; margin-top: 30px;">
                      You are receiving this because you enabled alerts for this search.
                      <br/> 
                      <a href="http://localhost:5173/dashboard" style="color: #6366f1;">Manage Alerts</a>
                    </p>
                  </div>
                </div>
              `,
            }),
          });
          console.log(`Sent alert to ${userEmail} for search ${search.name}`);
        }
      }

      // Update lastChecked
      await doc.ref.update({ lastChecked: new Date().toISOString() });
    }
  } catch (error) {
    console.error("Error running alert checker logic:", error);
  }
};

export const initAlertChecker = () => {
  // Run every 6 hours
  cron.schedule("0 */6 * * *", async () => {
    await runAlertCheck();
  });
  console.log("Alert checker cron job initialized.");
};
