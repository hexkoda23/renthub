import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@renthob/shared";

interface AuthState {
  user: (User & { id?: string }) | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: (User & { id?: string }) | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: "renthob-auth",
    }
  )
);
