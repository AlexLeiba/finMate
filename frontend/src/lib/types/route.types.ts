import type { useAuthStore } from "@/store/useAuthStore";

export type RouterContext = {
  auth: typeof useAuthStore;
};
