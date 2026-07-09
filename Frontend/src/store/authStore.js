import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  hydrated: false,
  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      hydrated: true,
    }),
  updateUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: Boolean(user && state.accessToken),
      hydrated: true,
    })),
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hydrated: true,
    }),
  markHydrated: () => set({ hydrated: true }),
}));
