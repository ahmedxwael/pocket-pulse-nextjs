"use client";

import { User } from "@/modules/user/types";
import { createContext } from "react";

type UserProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

export const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
