import admin from "firebase-admin";
import { Listing } from "@renthub/shared";
import dotenv from "dotenv";
import path from "path";

// Load env from root
dotenv.config({ path: "C:/Users/Hp/Documents/renthub-main/.env" });

if (!admin.apps.length) {
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "")
    .replace(/\\n/g, "\n")
    .replace(/^"|"$/g, ""); // Remove any accidental wrapping quotes

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    })
  });
}

// Explicitly get the default firestore instance
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const seedListings: Partial<Listing>[] = [
  {
    title: "Luxury 3 Bedroom Flat in Lekki Phase 1",
    description: "Beautifully finished 3 bedroom apartment with BQ, swimming pool, and gym. Secured environment with 24/7 power.",
    price: 4500000,
    address: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    lga: "Eti-Osa",
    coordinates: { lat: 6.4478, lng: 3.4723 },
    bedrooms: 3,
    bathrooms: 3,
    type: "flat",
    amenities: ["Pool", "Gym", "Power", "Security"],
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"],
    landlordId: "dummy-landlord-1",
    status: "active",
    verified: true,
    createdAt: new Date().toISOString(),
    views: 120,
  },
  {
    title: "Modern Self-Contain in Yaba",
    description: "Perfect for young professionals. Close to tech hubs and University of Lagos. Very accessible.",
    price: 800000,
    address: "Herbert Macaulay Way",
    city: "Yaba",
    state: "Lagos",
    lga: "Lagos Mainland",
    coordinates: { lat: 6.5167, lng: 3.3858 },
    bedrooms: 1,
    bathrooms: 1,
    type: "self-contain",
    amenities: ["Security", "WiFi"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"],
    landlordId: "dummy-landlord-2",
    status: "active",
    verified: true,
    createdAt: new Date().toISOString(),
    views: 45,
  },
  {
    title: "Spacious 4 Bedroom Duplex in Maitama",
    description: "High-end duplex in the heart of Abuja. Large compound, serene environment, top-notch security.",
    price: 12000000,
    address: "Maitama District",
    city: "Abuja",
    state: "FCT",
    lga: "Municipal",
    coordinates: { lat: 9.0765, lng: 7.4951 },
    bedrooms: 4,
    bathrooms: 4,
    type: "duplex",
    amenities: ["Generator", "Garden", "Security", "Parking"],
    images: ["https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=800"],
    landlordId: "dummy-landlord-3",
    status: "active",
    verified: true,
    createdAt: new Date().toISOString(),
    views: 89,
  },
  {
    title: "2 Bedroom Flat in Bodija",
    description: "Decent 2 bedroom flat in a quiet residential area of Ibadan. Good water supply and easy access to market.",
    price: 600000,
    address: "Bodija Estate",
    city: "Ibadan",
    state: "Oyo",
    lga: "Ibadan North",
    coordinates: { lat: 7.411, lng: 3.905 },
    bedrooms: 2,
    bathrooms: 2,
    type: "flat",
    amenities: ["Security", "Water"],
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"],
    landlordId: "dummy-landlord-1",
    status: "active",
    verified: false,
    createdAt: new Date().toISOString(),
    views: 23,
  }
];

async function seed() {
  console.log("🚀 Starting data seeding...");
  console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
  
  try {
    const listingsCollection = db.collection("listings");
    console.log("Collection reference created.");

    for (const listing of seedListings) {
      console.log(`Adding: ${listing.title}...`);
      const docRef = await listingsCollection.add({ ...listing, createdAt: new Date().toISOString() });
      console.log(`✅ Added with ID: ${docRef.id}`);
    }

    console.log("✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
