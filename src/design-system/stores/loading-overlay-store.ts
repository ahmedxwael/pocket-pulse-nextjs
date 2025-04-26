import { create } from "zustand";

export type LoadingOverlayStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  start: () => void;
  stop: () => void;
};

export const loadingOverlayStore = create<LoadingOverlayStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  start: () => set({ loading: true }),
  stop: () => set({ loading: false }),
}));
