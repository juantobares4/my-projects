import { create } from "zustand";
import { getDataFromSessionStorage, removeDataFromSessionStorage, saveDataInSessionStorage } from "../utils/sessionstorage";

const storedUser = getDataFromSessionStorage('currentUser');

export const useStore = create((set) => ({
  user: storedUser || null,
  isAuthenticated: !!storedUser,
  login: (loginUser) => {
    saveDataInSessionStorage('currentUser', loginUser);
    set({ user: loginUser, isAuthenticated: true });
  },
  logout: () => {
    removeDataFromSessionStorage('currentUser');
    set({ user: null, isAuthenticated: false });
  }

}));
