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

const MOCK_SAVED_SEARCHES: SavedSearch[] = [];

export class SavedSearchesService {
  private static collection = typeof db.collection === 'function' ? db.collection("savedSearches") : null;

  static async saveSearch(userId: string, data: Partial<SavedSearch>) {
    const newSearch: SavedSearch = {
      userId,
      filters: data.filters,
      name: data.name || "My Search",
      alertEnabled: data.alertEnabled ?? true,
      lastChecked: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    if (this.collection) {
      const docRef = await this.collection.add(newSearch);
      return { id: docRef.id, ...newSearch };
    } else {
      console.log("🛠️ Dev Mode: Saving search to mock storage");
      const id = `mock-search-${Date.now()}`;
      const searchWithId = { id, ...newSearch };
      MOCK_SAVED_SEARCHES.push(searchWithId);
      return searchWithId;
    }
  }

  static async getUserSearches(userId: string) {
    if (this.collection) {
      const snapshot = await this.collection
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
        
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...(doc.data() as SavedSearch) }));
    } else {
      console.log("🛠️ Dev Mode: Returning mock saved searches");
      return MOCK_SAVED_SEARCHES.filter(search => search.userId === userId);
    }
  }

  static async deleteSearch(userId: string, searchId: string) {
    if (this.collection) {
      const doc = await this.collection.doc(searchId).get();
      if (!doc.exists) throw new Error("Not found");
      if (doc.data()?.userId !== userId) throw new Error("Unauthorized");
      
      await this.collection.doc(searchId).delete();
    } else {
      console.log("🛠️ Dev Mode: Deleting search from mock storage");
      const index = MOCK_SAVED_SEARCHES.findIndex(search => search.id === searchId && search.userId === userId);
      if (index !== -1) {
        MOCK_SAVED_SEARCHES.splice(index, 1);
      } else {
        throw new Error("Not found");
      }
    }
  }

  static async toggleAlert(userId: string, searchId: string, alertEnabled: boolean) {
    if (this.collection) {
      const doc = await this.collection.doc(searchId).get();
      if (!doc.exists) throw new Error("Not found");
      if (doc.data()?.userId !== userId) throw new Error("Unauthorized");
      
      await this.collection.doc(searchId).update({ alertEnabled });
      return { id: searchId, ...doc.data(), alertEnabled };
    } else {
      console.log("🛠️ Dev Mode: Toggling alert in mock storage");
      const search = MOCK_SAVED_SEARCHES.find(search => search.id === searchId && search.userId === userId);
      if (search) {
        search.alertEnabled = alertEnabled;
        return { ...search };
      } else {
        throw new Error("Not found");
      }
    }
  }
}
