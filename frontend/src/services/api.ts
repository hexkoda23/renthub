import axios from "axios";
import { auth } from "./firebase/config";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  
  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      console.log("Firebase not initialized, skipping auth token");
    }
  } else {
    const authStore = useAuthStore.getState();
    if (authStore.user) {
      config.headers.Authorization = `Bearer dev-token-${authStore.user.id}`;
    }
  }
  
  return config;
});

export default api;
