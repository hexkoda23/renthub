import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { subscribeToAuth, logout as firebaseLogout, signInWithGoogle } from "../services/firebase/auth";
import { clearLocalSession, getLocalSession } from "../services/localAuth";
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
          setUser({
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
            photoURL: firebaseUser.photoURL || undefined,
            role: "renter",
            phone: "",
            state: "",
            verified: false,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        const localUser = getLocalSession();
        setUser(localUser ? { ...localUser, id: localUser.uid } : null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const signOut = async () => {
    try {
      await firebaseLogout();
    } catch (error) {
      console.warn("Firebase sign out failed; clearing local session.", error);
    }
    clearLocalSession();
    clearAuth();
  };

  return { user, isAuthenticated: !!user, signOut, signInWithGoogle };
};
