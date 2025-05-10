import { GenericObject } from "@/shared/types";
import { create } from "zustand";
import { User } from "../types";

export type UserStore = {
  user: GenericObject;
  setUser: (data: Partial<User>) => void;
};

export const userStore = create<UserStore>((set) => ({
  user: {},
  setUser: (user: GenericObject) => set({ user }),
}));
