import { atom } from "@mongez/react-atom";

export const loadingOverlayAtom = atom({
  key: "loading-overlay",
  default: {
    opened: false,
    data: null,
  },
  actions: {
    start: (data: any) => {
      loadingOverlayAtom.set({
        opened: true,
        data,
      });
    },
    stop: () => {
      loadingOverlayAtom.set({
        opened: false,
        data: null,
      });
    },
  },
});
