import { apiFactory } from "@/api/services/apiFactory";
import type { AuthStateType } from "@/lib/types/auth.types";

import { create } from "zustand";

export const useAuthStore = create<AuthStateType>((set) => {
  return {
    user: null,
    isLoading: false,
    error: null,

    setLoading: (isLoading) => set({ isLoading }),
    setUser: (user) => set({ user }),

    // APIs
    getProfile: async () => {
      set({ isLoading: true });
      try {
        const user = await apiFactory().getProfile();

        set({ user: user, error: null });
      } catch (error: unknown) {
        set({
          user: null,
          error: error as string,
        });
        throw error as string;
      } finally {
        set({ isLoading: false });
      }
    },
    updateProfile: async (data) => {
      set({ isLoading: true });
      try {
        const user = await apiFactory().updateProfile(data);

        set({ user: user, error: null });
      } catch (error: unknown) {
        set({
          user: null,
          error: error as string,
        });
        throw error as string;
      } finally {
        set({ isLoading: false });
      }
    },
    signup: async (data) => {
      set({ isLoading: true });
      try {
        await apiFactory().signup(data);
        set({ error: null });
      } catch (error: unknown) {
        set({
          user: null,
          error: error as string,
        });
        throw error as string;
      } finally {
        set({ isLoading: false });
      }
    },
    signin: async (data) => {
      set({ isLoading: true });
      try {
        const response = await apiFactory().signin(data);
        set({ user: response, error: null });
      } catch (error: unknown) {
        set({
          user: null,
          error: error as string,
        });
        throw error as string;
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await apiFactory().logout();
        set({ user: null, error: null });
      } catch (error: unknown) {
        set({
          user: null,
          error: error as string,
        });
        throw error as string;
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
