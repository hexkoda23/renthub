import admin from "firebase-admin"; 
import { Listing } from "@renthob/shared"; 
import dotenv from "dotenv"; 
import path from "path"; 
 
// .env is at the monorepo root (one level above /backend) 
dotenv.config({ path: path.resolve(__dirname, "../../../.env") }); 
 
const projectId = process.env.FIREBASE_PROJECT_ID; 
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"); 
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL; 
 
console.log("🔍 Project ID:", projectId); 
console.log("🔍 Client Email:", clientEmail); 
console.log("🔍 Private Key loaded:", privateKey ? `YES (${privateKey.length} chars)` : "NO ❌"); 
 
if (!projectId || !privateKey || !clientEmail) { 
  console.error("❌ Missing Firebase credentials in .env file!"); 
  console.error("Make sure FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL are set."); 
  process.exit(1); 
} 
 
if (!admin.apps.length) { 
  admin.initializeApp({ 
    credential: admin.credential.cert({ 
      projectId, 
      privateKey, 
      clientEmail, 
    }), 
    databaseURL: `https://${projectId}.firebaseio.com`
  }); 
} 
 
const db = admin.firestore(); 
db.settings({ 
  ignoreUndefinedProperties: true, 
}); 
 
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
    listingPurpose: "rent", 
    rentFrequency: "yearly", 
    source: "renthob", 
    electricityBand: "band-a", 
    waterSituation: "running", 
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
    listingPurpose: "rent", 
    rentFrequency: "yearly", 
    source: "renthob", 
    electricityBand: "band-b", 
    waterSituation: "none", // Fixed: "borehole" -> "none" (not in type)
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
    listingPurpose: "sale", 
    source: "renthob", 
    electricityBand: "band-a", 
    waterSituation: "running", 
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
    listingPurpose: "rent", 
    rentFrequency: "yearly", 
    source: "renthob", 
    electricityBand: "band-c", 
    waterSituation: "not-running", // Fixed: "tanker" -> "not-running" (not in type)
  }, 
  { 
    title: "1 Bedroom Shortlet Apartment in Victoria Island", 
    description: "Fully furnished shortlet apartment in the heart of VI. Perfect for business travelers and tourists.", 
    price: 45000, 
    address: "Adeola Odeku Street", 
    city: "Victoria Island", 
    state: "Lagos", 
    lga: "Eti-Osa", 
    coordinates: { lat: 6.4281, lng: 3.4219 }, 
    bedrooms: 1, 
    bathrooms: 1, 
    type: "flat", 
    amenities: ["WiFi", "AC", "Security", "Power"], 
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"], 
    landlordId: "dummy-landlord-4", 
    status: "active", 
    verified: true, 
    createdAt: new Date().toISOString(), 
    views: 200, 
    listingPurpose: "shortlet", 
    shortletPricing: { perNight: 45000, perWeek: 280000, minimumStay: 2 }, // Fixed: removed perMonth
    source: "renthob", 
    electricityBand: "band-a", 
    waterSituation: "running", 
  }, 
]; 
 
async function seed() { 
  console.log("🚀 Starting data seeding..."); 
 
  try { 
    const listingsCol = db.collection("listings"); 
 
    for (const listing of seedListings) { 
      const docRef = await listingsCol.add(listing); 
      console.log(`✅ Added: ${listing.title} (ID: ${docRef.id})`); 
    } 
 
    console.log("\n✨ Seeding completed successfully!"); 
    console.log(`📦 ${seedListings.length} listings added to Firestore.`); 
    process.exit(0); 
  } catch (error: any) { 
    console.error("❌ Seeding failed:", error.message); 
    console.error("Code:", error.code); 
    process.exit(1); 
  } 
} 
 
seed();
