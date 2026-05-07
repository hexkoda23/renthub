export type RenthobProperty = {
  id: string;
  title: string;
  images: string[];
  type: string;
  price: string;
  rawPrice: number;
  address: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: string;
  description: string;
  amenities: string[];
  landlord: {
    name: string;
    role: string;
    phone: string;
    email: string;
    response: string;
  };
  highlights: string[];
  verified: boolean;
  availableFrom: string;
};

export const renthobProperties: RenthobProperty[] = [
  {
    id: "2d32a995-9d49-4748-a314-e3ca6efe021a",
    title: "Luxury 3-Bedroom Apartment in Lekki Phase 1",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200",
    ],
    type: "Apartment",
    price: "\u20A64.5M",
    rawPrice: 4500000,
    address: "12 Admiralty Way, Lekki Phase 1",
    city: "Lekki",
    state: "Lagos",
    beds: 3,
    baths: 3,
    sqft: "1,800 sqft",
    description:
      "A bright, fully finished apartment in the heart of Lekki Phase 1 with spacious bedrooms, a fitted kitchen, steady water, and secure compound parking. The property is close to restaurants, supermarkets, schools, and major routes into Victoria Island.",
    amenities: ["Air Conditioning", "Fitted Kitchen", "Secure Parking", "24/7 Security", "Balcony", "Water Heater"],
    landlord: {
      name: "Tola Adebayo",
      role: "Verified Landlord",
      phone: "+234 801 234 5678",
      email: "tola@renthob.com",
      response: "Usually replies within 15 minutes",
    },
    highlights: ["Verified listing", "Direct landlord contact", "Available for yearly rent", "No hidden inspection fee"],
    verified: true,
    availableFrom: "2026-06-01",
  },
  {
    id: "spacious-4-bedroom-duplex-ikoyi",
    title: "Spacious 4-Bedroom Duplex in Ikoyi",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
    ],
    type: "Duplex",
    price: "\u20A612.0M",
    rawPrice: 12000000,
    address: "8 Bourdillon Road, Ikoyi",
    city: "Ikoyi",
    state: "Lagos",
    beds: 4,
    baths: 4,
    sqft: "3,500 sqft",
    description:
      "A generous family duplex in a quiet Ikoyi close with large living areas, ensuite rooms, a private balcony, and ample parking. Ideal for families or executives who want privacy and fast access to Victoria Island.",
    amenities: ["Boys Quarters", "Private Parking", "Generator", "Security", "Ensuite Rooms", "Family Lounge"],
    landlord: {
      name: "Cedar Homes",
      role: "Verified Agency",
      phone: "+234 809 111 2233",
      email: "listings@cedarhomes.ng",
      response: "Usually replies within 1 hour",
    },
    highlights: ["Premium neighborhood", "Family-sized layout", "Agency verified", "Inspection available"],
    verified: true,
    availableFrom: "2026-05-20",
  },
  {
    id: "cozy-2-bedroom-flat-yaba",
    title: "Cozy 2-Bedroom Flat in Yaba",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],
    type: "Apartment",
    price: "\u20A61.2M",
    rawPrice: 1200000,
    address: "23 Herbert Macaulay Way, Yaba",
    city: "Yaba",
    state: "Lagos",
    beds: 2,
    baths: 2,
    sqft: "950 sqft",
    description:
      "A practical two-bedroom flat for renters who want easy access to the mainland tech and university corridor. The apartment has good natural light, tiled floors, and a straightforward layout.",
    amenities: ["Tiled Floors", "Water Supply", "Prepaid Meter", "Wardrobes", "Gated Compound"],
    landlord: {
      name: "Musa Ibrahim",
      role: "Verified Landlord",
      phone: "+234 806 555 7890",
      email: "musa@renthob.com",
      response: "Usually replies same day",
    },
    highlights: ["Budget friendly", "Close to transport", "Verified owner", "Good for students or young professionals"],
    verified: true,
    availableFrom: "2026-05-15",
  },
  {
    id: "premium-penthouse-banana-island",
    title: "Premium Penthouse in Banana Island",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
    ],
    type: "Penthouse",
    price: "\u20A635.0M",
    rawPrice: 35000000,
    address: "2 Ocean Parade, Banana Island",
    city: "Ikoyi",
    state: "Lagos",
    beds: 5,
    baths: 5,
    sqft: "5,500 sqft",
    description:
      "A high-end penthouse with panoramic views, premium finishes, generous entertaining areas, and private access control. Designed for renters who want a quiet luxury residence with excellent security.",
    amenities: ["Ocean View", "Elevator", "Pool", "Gym", "Smart Home", "Concierge", "Private Terrace"],
    landlord: {
      name: "PrimeKey Realty",
      role: "Verified Agency",
      phone: "+234 802 900 4500",
      email: "prime@renthob.com",
      response: "Usually replies within 30 minutes",
    },
    highlights: ["Luxury verified", "Private terrace", "Estate security", "Premium finish"],
    verified: true,
    availableFrom: "2026-07-01",
  },
  {
    id: "modern-studio-victoria-island",
    title: "Modern Studio Apartment in Victoria Island",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],
    type: "Studio",
    price: "\u20A62.0M",
    rawPrice: 2000000,
    address: "45 Adeola Odeku Street, VI",
    city: "Victoria Island",
    state: "Lagos",
    beds: 1,
    baths: 1,
    sqft: "650 sqft",
    description:
      "A compact studio apartment for professionals who want to live close to offices, restaurants, and nightlife in Victoria Island. Clean finishes, efficient layout, and a managed building.",
    amenities: ["Managed Building", "Air Conditioning", "Prepaid Meter", "Security", "Fitted Wardrobe"],
    landlord: {
      name: "Renthob Partner Listings",
      role: "Verified Agency",
      phone: "+234 803 333 2222",
      email: "partners@renthob.com",
      response: "Usually replies within 2 hours",
    },
    highlights: ["Central location", "Ideal for professionals", "Managed building", "Move-in ready"],
    verified: true,
    availableFrom: "2026-05-30",
  },
];

export const getRenthobProperty = (id?: string) =>
  renthobProperties.find((property) => property.id === id) ?? renthobProperties[0];
