"use client";

import { loadingOverlayAtom } from "@/design-system/atoms";
import { toastSuccess } from "@/design-system/components";
import { Button, buttonVariants } from "@/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/design-system/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { signOutAction as signOut } from "@/modules/auth/actions";
import { UserContext } from "@/providers";
import { URLS } from "@/shared/urls";
import { LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";

export function UserAuthButtons() {
  const user = useContext(UserContext);

  const router = useRouter();
  const loading = loadingOverlayAtom.use("opened");

  const handleSignOut = async () => {
    try {
      loadingOverlayAtom.start();
      await signOut();
    } finally {
      toastSuccess("Signed out successfully");
      loadingOverlayAtom.stop();
      redirect(URLS.signIn);
    }
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Image
            src={user.image || user.name[0]}
            alt={user.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(URLS.profile)}>
          <UserIcon /> Profile
        </DropdownMenuItem>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          disabled={loading}
          className="justify-start p-2 text-destructive dark:hover:bg-destructive ">
          <LogOutIcon /> Sign out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      href={URLS.signIn}
      className={cn(buttonVariants({ variant: "secondary" }))}>
      Sign in
    </Link>
  );
}
