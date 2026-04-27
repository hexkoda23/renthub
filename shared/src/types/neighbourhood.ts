export interface Neighbourhood {
  id: string;
  name: string;
  city: string;
  state: string;
  safetyScore: number; // 1-10
  affordabilityScore: number; // 1-10
  trafficScore: number; // 1-10
  description: string;
  knownFor: string[];
  avgRentRange: {
    min: number;
    max: number;
  };
  lastUpdated: string;
}
