import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (loginUser) => set({ user: loginUser, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })

}));
