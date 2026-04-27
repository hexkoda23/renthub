export const AMENITIES = [
  // Original
  "Running Water",
  "NEPA Light",
  "Generator",
  "Security",
  "Parking",
  "Furnished",
  "POP Ceiling",
  "Tiled Floor",
  "Kitchen Cabinet",
  "Wardrobe",
  "Balcony",
  "Air Conditioning",
  "Fenced Yard",
  // Nigerian additions
  "Prepaid Meter",
  "Postpaid Meter",
  "Solar Panels",
  "Inverter",
  "Borehole",
  "Estate Water",
  "CCTV",
  "Intercom",
  "Gym",
  "Swimming Pool",
  "Boys Quarters (BQ)",
  "Servant Quarters",
] as const;

export const ELECTRICITY_BANDS = [
  { value: "band-a", label: "Band A", description: "24/7 supply", color: "text-green-600", bg: "bg-green-50 border-green-200" },
  { value: "band-b", label: "Band B", description: "16–20hrs supply", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
  { value: "band-c", label: "Band C", description: "12hrs supply", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  { value: "band-d", label: "Band D", description: "8hrs supply", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  { value: "none", label: "No Light", description: "No electricity", color: "text-neutral-600", bg: "bg-neutral-100 border-neutral-300" },
] as const;

export const WATER_OPTIONS = [
  { value: "running", label: "Running Water", icon: "💧" },
  { value: "not-running", label: "Water (not running)", icon: "🚿" },
  { value: "none", label: "No Water", icon: "🚫" },
] as const;

export const PARKING_OPTIONS = [
  { value: "compound", label: "Compound Parking", icon: "🅿️" },
  { value: "nearby", label: "Nearby (outside)", icon: "🚗" },
  { value: "street", label: "Street Parking", icon: "🛣️" },
  { value: "none", label: "No Parking", icon: "❌" },
] as const;

export const PROPERTY_CONDITIONS = [
  { value: "newly-built", label: "Newly Built", emoji: "✨" },
  { value: "renovated", label: "Renovated", emoji: "🔧" },
  { value: "old-but-clean", label: "Old but Clean", emoji: "🧹" },
  { value: "needs-work", label: "Needs Work", emoji: "🏚️" },
] as const;

export const LAND_TITLES = [
  { value: "c-of-o", label: "Certificate of Occupancy (C of O)" },
  { value: "r-of-o", label: "Right of Occupancy (R of O)" },
  { value: "excision", label: "Excision" },
  { value: "deed-of-assignment", label: "Deed of Assignment" },
  { value: "none", label: "No Title" },
] as const;

export const LISTING_PURPOSES = [
  { value: "rent", label: "For Rent" },
  { value: "sale", label: "For Sale" },
  { value: "shortlet", label: "Shortlet" },
] as const;
