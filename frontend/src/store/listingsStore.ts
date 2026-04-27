import { create } from 'zustand';
import { Listing } from '@renthub/shared';

interface ListingsState {
  listings: Listing[];
  isLoading: boolean;
  setListings: (l: Listing[]) => void;
  setLoading: (l: boolean) => void;
}

export const useListingsStore = create<ListingsState>((set) => ({
  listings: [],
  isLoading: false,
  setListings: (listings) => set({ listings }),
  setLoading: (isLoading) => set({ isLoading }),
}));
