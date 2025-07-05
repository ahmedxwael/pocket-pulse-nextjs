import { atom } from "@mongez/react-atom";

export const loadingOverlayAtom = atom({
  key: "loading-overlay",
  default: {
    opened: false,
    data: null,
  },
  actions: {
    start: (data: any) => {
      loadingOverlayAtom.merge({
        opened: true,
        data,
      });
    },
    stop: () => {
      loadingOverlayAtom.merge({
        opened: false,
        data: null,
      });
    },
  },
});
