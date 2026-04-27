import { db } from "../config/firebase";

const COLLECTION = "neighbourhoods";

export class NeighbourhoodsService {
  static async getAll() {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }
}
