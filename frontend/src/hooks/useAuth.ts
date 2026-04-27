import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { subscribeToAuth, logout as firebaseLogout, signInWithGoogle } from "../services/firebase/auth";
import axios from "axios";

export const useAuth = () => {
  const { user, setUser, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Sync with our backend to get full user profile
          const token = await firebaseUser.getIdToken();
          const response = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.data);
        } catch (error) {
          console.error("Failed to sync user profile", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const signOut = async () => {
    await firebaseLogout();
    clearAuth();
  };

  return { user, isAuthenticated: !!user, signOut, signInWithGoogle };
};
