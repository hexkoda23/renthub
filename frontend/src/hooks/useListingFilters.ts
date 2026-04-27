import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useListingFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      q: searchParams.get("q") || "",
      state: searchParams.get("state") || "",
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "12"),
      // Nigerian-specific filters
      purpose: searchParams.get("purpose") || "",
      electricityBand: searchParams.get("electricityBand") || "",
      water: searchParams.get("water") || "",
      parking: searchParams.get("parking") || "",
      condition: searchParams.get("condition") || "",
      listingType: searchParams.get("listingType") || "",
      negotiable: searchParams.get("negotiable") || "",
    };
  }, [searchParams]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Reset page on filter change (unless we are just changing the page)
    if (!newFilters.page) {
      params.set("page", "1");
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    filters,
    updateFilters,
    clearFilters
  };
};
