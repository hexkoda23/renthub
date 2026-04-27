import { db } from "../config/firebase";

export interface SavedSearch {
  id?: string;
  userId: string;
  filters: any;
  name: string;
  alertEnabled: boolean;
  lastChecked: string;
  createdAt: string;
}

export class SavedSearchesService {
  private static collection = db.collection("savedSearches");

  static async saveSearch(userId: string, data: Partial<SavedSearch>) {
    const newSearch: SavedSearch = {
      userId,
      filters: data.filters,
      name: data.name || "My Search",
      alertEnabled: data.alertEnabled ?? true,
      lastChecked: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await this.collection.add(newSearch);
    return { id: docRef.id, ...newSearch };
  }

  static async getUserSearches(userId: string) {
    const snapshot = await this.collection
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
      
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...(doc.data() as SavedSearch) }));
  }

  static async deleteSearch(userId: string, searchId: string) {
    const doc = await this.collection.doc(searchId).get();
    if (!doc.exists) throw new Error("Not found");
    if (doc.data()?.userId !== userId) throw new Error("Unauthorized");
    
    await this.collection.doc(searchId).delete();
  }

  static async toggleAlert(userId: string, searchId: string, alertEnabled: boolean) {
    const doc = await this.collection.doc(searchId).get();
    if (!doc.exists) throw new Error("Not found");
    if (doc.data()?.userId !== userId) throw new Error("Unauthorized");
    
    await this.collection.doc(searchId).update({ alertEnabled });
    return { id: searchId, ...doc.data(), alertEnabled };
  }
}
