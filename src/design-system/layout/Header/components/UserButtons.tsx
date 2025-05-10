"use client";

import { ThemeToggler } from "@/design-system/components";
import { UserAuthButtons } from "@/modules/user/components";
import { UserContext } from "@/providers";
import { useContext } from "react";
import { NavLinksDrawer } from "./NavLinksDrawer";

export function UserButtons() {
  const user = useContext(UserContext);

  return (
    <div className="flex items-center gap-2">
      <UserAuthButtons user={user} />
      <ThemeToggler />
      <NavLinksDrawer />
    </div>
  );
}
