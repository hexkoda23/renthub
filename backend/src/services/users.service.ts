import { db } from "../config/firebase";
import { User } from "@renthub/shared";

const COLLECTION = "users";

export class UsersService {
  static async getById(uid: string) {
    const doc = await db.collection(COLLECTION).doc(uid).get();
    if (!doc.exists) return null;
    return { uid: doc.id, ...doc.data() } as User;
  }

  static async update(uid: string, data: Partial<User>) {
    await db.collection(COLLECTION).doc(uid).set(data, { merge: true });
    return { uid, ...data };
  }

  static async getUserListings(uid: string) {
    const snapshot = await db.collection("listings").where("landlordId", "==", uid).get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }
}
