import { create } from "zustand";
import axios from "@/app/config/axios.config";

type User = {
  _id: string;
  username: string;
  email: string;
  isSubscribed: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),

  clearUser: () => set({ user: null, loading: false }),

  fetchUser: async () => {
    try {
      const res = await axios.get("/user", { withCredentials: true });

      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  updateUser: (PartialUser) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...PartialUser } : state.user,
    }));
  },
}));
