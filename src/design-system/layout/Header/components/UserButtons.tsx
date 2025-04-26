"use client";

import { ThemeToggler } from "@/design-system/components";
import { UserAuthButtons } from "@/modules/user/components";
import { User } from "@/modules/user/types";
import { NavLinksDrawer } from "./NavLinksDrawer";

type UserAuthButtonsProps = {
  user: User | null;
};

export function UserButtons({ user }: UserAuthButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <UserAuthButtons user={user} />
      <ThemeToggler />
      <NavLinksDrawer />
    </div>
  );
}
