import { db } from "../config/firebase";
import { User } from "@renthob/shared";

const COLLECTION = "users";

const MOCK_USERS: Record<string, User> = {};

export class UsersService {
  private static collection = typeof db.collection === 'function' ? db.collection(COLLECTION) : null;

  private static async withFallback<T>(operation: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
    if (!this.collection) return fallback();
    try {
      return await operation();
    } catch (err) {
      console.warn("Firestore operation failed, using mock fallback:", err);
      return fallback();
    }
  }

  static async getById(uid: string) {
    return this.withFallback(
      async () => {
        const doc = await this.collection!.doc(uid).get();
        if (!doc.exists) return null;
        return { uid: doc.id, ...doc.data() } as User;
      },
      async () => {
        console.log("🛠️ Dev Mode: Returning mock user");
        return MOCK_USERS[uid] || null;
      }
    );
  }

  static async update(uid: string, data: Partial<User>) {
    return this.withFallback(
      async () => {
        await this.collection!.doc(uid).set(data, { merge: true });
        return { uid, ...data };
      },
      async () => {
        console.log("🛠️ Dev Mode: Updating mock user");
        MOCK_USERS[uid] = { ...MOCK_USERS[uid], ...data } as User;
        return { uid, ...data };
      }
    );
  }

  static async getUserListings(uid: string) {
    return this.withFallback(
      async () => {
        const snapshot = await this.collection!.firestore.collection("listings").where("landlordId", "==", uid).get();
        return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      },
      async () => {
        console.log("🛠️ Dev Mode: Returning mock user listings");
        return [];
      }
    );
  }
}
