import { db } from "../config/firebase";
import { Listing } from "@renthob/shared";

const COLLECTION = "listings";

export class ListingsService {
  static async getAll(filters: any, pagination: { offset: number; limit: number }) {
    let query: any = db.collection(COLLECTION);

    // Original filters
    if (filters.state) query = query.where("state", "==", filters.state);
    if (filters.city) query = query.where("city", "==", filters.city);
    if (filters.type) query = query.where("type", "==", filters.type);
    // Price filtering based on purpose
    if (filters.minPrice) {
      if (filters.purpose === "sale") {
        query = query.where("salePrice", ">=", parseInt(filters.minPrice));
      } else if (filters.purpose === "shortlet") {
        query = query.where("shortletPricing.perNight", ">=", parseInt(filters.minPrice));
      } else {
        query = query.where("price", ">=", parseInt(filters.minPrice));
      }
    }

    if (filters.maxPrice) {
      if (filters.purpose === "sale") {
        query = query.where("salePrice", "<=", parseInt(filters.maxPrice));
      } else if (filters.purpose === "shortlet") {
        query = query.where("shortletPricing.perNight", "<=", parseInt(filters.maxPrice));
      } else {
        query = query.where("price", "<=", parseInt(filters.maxPrice));
      }
    }
    if (filters.bedrooms) query = query.where("bedrooms", "==", parseInt(filters.bedrooms));

    // Nigerian-specific filters
    if (filters.purpose) query = query.where("listingPurpose", "==", filters.purpose);
    if (filters.electricityBand) query = query.where("electricityBand", "==", filters.electricityBand);
    if (filters.water) query = query.where("waterSituation", "==", filters.water);
    if (filters.parking) query = query.where("parkingSituation", "==", filters.parking);
    if (filters.condition) query = query.where("propertyCondition", "==", filters.condition);
    if (filters.listingType) query = query.where("listingType", "==", filters.listingType);
    if (filters.negotiable === "true") query = query.where("isNegotiable", "==", true);
    if (filters.source) query = query.where("source", "==", filters.source);

    const snapshot = await query
      .orderBy("createdAt", "desc")
      .offset(pagination.offset)
      .limit(pagination.limit)
      .get();

    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async create(data: Partial<Listing>) {
    const res = await db.collection(COLLECTION).add({
      ...data,
      views: 0,
      createdAt: new Date().toISOString(),
      status: "active",
    });
    return { id: res.id, ...data };
  }

  static async update(id: string, data: Partial<Listing>) {
    await db.collection(COLLECTION).doc(id).update(data);
    return { id, ...data };
  }

  static async delete(id: string) {
    await db.collection(COLLECTION).doc(id).delete();
    return true;
  }

  static async search(queryText: string) {
    // Basic Firestore search (prefix matching)
    // For more complex search, you'd usually use Algolia or a separate search index
    const snapshot = await db.collection(COLLECTION)
      .where("title", ">=", queryText)
      .where("title", "<=", queryText + "\uf8ff")
      .limit(20)
      .get();

    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }
}
