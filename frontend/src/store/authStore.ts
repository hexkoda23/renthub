import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@renthub/shared";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
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
      mockLogin: () => set({ 
        user: { id: "dev-user-123", name: "Dev User", email: "dev@example.com", role: "tenant" } as any, 
        isAuthenticated: true, 
        isLoading: false 
      }),
      clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: "renthub-auth",
    }
  )
);
