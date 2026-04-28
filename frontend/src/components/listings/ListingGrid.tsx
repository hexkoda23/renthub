import { Listing } from "@renthob/shared";
import { ListingCard } from "./ListingCard";
import { Skeleton } from "../ui";

export const DEMO_LISTINGS: Listing[] = [
  {
    id: "demo-1",
    title: "Luxury 3 Bedroom Apartment",
    description: "Beautiful apartment in the heart of the city.",
    type: "apartment",
    listingPurpose: "rent",
    rentFrequency: "yearly",
    price: 3500000,
    address: "Admiralty Way",
    city: "Lekki Phase 1",
    state: "Lagos",
    bedrooms: 3,
    bathrooms: 3,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"],
    amenities: ["Swimming Pool", "24/7 Security"],
    electricityBand: "A",
    waterSituation: "running",
    parkingSituation: "compound",
    verified: true,
    source: "renthob",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    landlordId: "demo-landlord"
  } as unknown as Listing,
  {
    id: "demo-2",
    title: "Spacious 4 Bedroom Duplex",
    description: "Modern duplex with a large compound.",
    type: "duplex",
    listingPurpose: "sale",
    price: 150000000,
    salePrice: 150000000,
    address: "Gowon Estate",
    city: "Egbeda",
    state: "Lagos",
    bedrooms: 4,
    bathrooms: 5,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"],
    amenities: ["Ample Parking", "Gated Estate"],
    electricityBand: "B",
    waterSituation: "running",
    parkingSituation: "compound",
    verified: true,
    source: "renthob",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    landlordId: "demo-landlord"
  } as unknown as Listing,
  {
    id: "demo-3",
    title: "Cozy 1 Bedroom Shortlet",
    description: "Fully furnished shortlet for your weekend getaway.",
    type: "apartment",
    listingPurpose: "shortlet",
    price: 80000,
    shortletPricing: { daily: 80000, weekly: 500000, monthly: 1800000 },
    address: "Sinari Daranijo",
    city: "Victoria Island",
    state: "Lagos",
    bedrooms: 1,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"],
    amenities: ["WiFi", "Smart TV", "Cleaning Service"],
    electricityBand: "A",
    waterSituation: "running",
    parkingSituation: "compound",
    verified: true,
    source: "renthob",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    landlordId: "demo-landlord"
  } as unknown as Listing
];

interface ListingGridProps {
  listings?: Listing[];
  isLoading?: boolean;
}

export const ListingGrid = ({ listings, isLoading }: ListingGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayListings = (!listings || listings.length === 0) ? DEMO_LISTINGS : listings;

  return (
    <div className="space-y-6">
      {(!listings || listings.length === 0) && (
        <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
          <span>🌟 Showing demo properties while we fetch real listings for you.</span>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};
