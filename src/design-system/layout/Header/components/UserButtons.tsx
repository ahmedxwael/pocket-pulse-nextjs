"use client";

import { ThemeToggler } from "@/design-system/components";
import { Button } from "@/design-system/components/ui/button";
import { UserAuthButtons } from "@/modules/user/components";
import { UserContext } from "@/providers";
import { URLS } from "@/shared/urls";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { NavLinksDrawer } from "./NavLinksDrawer";

export function UserButtons() {
  const user = useContext(UserContext);
  const router = useRouter();

  const handleProfile = () => {
    if (user) {
      router.push(URLS.profile);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
            className="rounded-full">
            <Image
              src={user.image || user.name[0]}
              alt={user.name}
              width={40}
              height={40}
              className="w-8 h-8 rounded-full"
            />
          </Button>
          <span className="hidden md:inline-block font-medium">
            {user.name}
          </span>
        </div>
      ) : (
        <UserAuthButtons user={user} />
      )}
      <ThemeToggler />
      <NavLinksDrawer />
    </div>
  );
}
