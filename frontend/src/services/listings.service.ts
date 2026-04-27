import api from "./api";
import { Listing, ApiResponse, PaginatedResponse } from "@renthub/shared";

export const listingsService = {
  getListings: (filters: any) => 
    api.get<PaginatedResponse<Listing>>("/listings", { params: filters }),
  
  getListing: (id: string) => 
    api.get<ApiResponse<Listing>>(`/listings/${id}`),
  
  createListing: (data: Partial<Listing>) => 
    api.post<ApiResponse<Listing>>("/listings", data),
  
  updateListing: (id: string, data: Partial<Listing>) => 
    api.put<ApiResponse<Listing>>(`/listings/${id}`, data),
  
  deleteListing: (id: string) => 
    api.delete(`/listings/${id}`),
    
  searchListings: (query: string) => 
    api.get<ApiResponse<Listing[]>>("/listings/search", { params: { q: query } }),
};
