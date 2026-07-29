import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  register: async (fullName, email, password) => {
    const { data } = await api.post("/auth/register", { fullName, email, password });
    const user: User = { id: data.id, fullName: data.fullName, email: data.email };
    await SecureStore.setItemAsync("token", data.token);
    set({ user, token: data.token, isAuthenticated: true });
  },

  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    const user: User = { id: data.id, fullName: data.fullName, email: data.email };
    await SecureStore.setItemAsync("token", data.token);
    set({ user, token: data.token, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  restoreSession: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        set({ isLoading: false });
        return;
      }
      const { data } = await api.get("/auth/me");
      set({ user: data, token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      await SecureStore.deleteItemAsync("token");
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
