"use client";

import { Button, buttonVariants } from "@/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/design-system/components/ui/dropdown-menu";
import { loadingOverlayStore } from "@/design-system/stores";
import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import { LogOutIcon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "../types";

type UserAuthButtonsProps = {
  user: User | null;
};

export function UserAuthButtons({ user }: UserAuthButtonsProps) {
  const router = useRouter();
  const { loading, setLoading } = loadingOverlayStore();

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: URLS.signIn });
    setLoading(false);
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Image
            src={user.image || ""}
            alt={user.name || ""}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col">
        <DropdownMenuItem onClick={() => router.push(URLS.profile)}>
          <UserIcon /> Profile
        </DropdownMenuItem>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          disabled={loading}
          className="justify-start p-2 dark:hover:bg-accent">
          <LogOutIcon className="text-muted-foreground" /> Sign out
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
