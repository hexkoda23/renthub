export type UserRole = "renter" | "landlord" | "agent";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  phone: string;
  state: string;
  verified: boolean;
  createdAt: string;
}
