import { useState, useCallback } from 'react';
import { useListingsStore } from '../store/listingsStore';
import { listingsService } from '../services/listings.service';

export const useListings = () => {
  const { listings, isLoading, setListings, setLoading } = useListingsStore();
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async (filters?: any) => {
    setLoading(true);
    try {
      const { data } = await listingsService.getListings(filters);
      setListings(data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  }, [setListings, setLoading]);

  const getListingById = useCallback(async (id: string) => {
    try {
      const { data } = await listingsService.getListing(id);
      return data.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }, []);

  return { listings, isLoading, error, fetchListings, getListingById };
};
