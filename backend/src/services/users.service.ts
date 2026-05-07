import { db } from "../config/firebase";
import { User } from "@renthob/shared";

const COLLECTION = "users";

const MOCK_USERS: Record<string, User> = {};

export class UsersService {
  private static collection = typeof db.collection === 'function' ? db.collection(COLLECTION) : null;

  static async getById(uid: string) {
    if (this.collection) {
      const doc = await this.collection.doc(uid).get();
      if (!doc.exists) return null;
      return { uid: doc.id, ...doc.data() } as User;
    } else {
      console.log("🛠️ Dev Mode: Returning mock user");
      return MOCK_USERS[uid] || null;
    }
  }

  static async update(uid: string, data: Partial<User>) {
    if (this.collection) {
      await this.collection.doc(uid).set(data, { merge: true });
      return { uid, ...data };
    } else {
      console.log("🛠️ Dev Mode: Updating mock user");
      MOCK_USERS[uid] = { ...MOCK_USERS[uid], ...data } as User;
      return { uid, ...data };
    }
  }

  static async getUserListings(uid: string) {
    if (this.collection) {
      const snapshot = await this.collection.firestore.collection("listings").where("landlordId", "==", uid).get();
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    } else {
      console.log("🛠️ Dev Mode: Returning mock user listings");
      return [];
    }
  }
}
