import { create } from "zustand";

import { getDataFromSessionStorage, removeDataFromSessionStorage, saveDataInSessionStorage } from "../utils/sessionstorage";

const storedUser = getDataFromSessionStorage('currentUser');

export const useStore = create((set) => ({
  user: storedUser,
  isAuthenticated: !storedUser, // La doble negación, garantiza que el valor sea un booleano. Ya que si storedUser es null, se cambia a false porque null es una expresión 'falsy'.
  login: (loginUser) => {
    saveDataInSessionStorage('currentUser', loginUser);
    set({ user: loginUser, isAuthenticated: true });
  
  },
  logout: () => {
    removeDataFromSessionStorage('currentUser');
    set({ user: null, isAuthenticated: false });
  
  }

}));
