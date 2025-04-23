"use client";

import { ThemeToggler } from "@/design-system/components";
import { Button, buttonVariants } from "@/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/design-system/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UserSession } from "@/modules/user/types";
import { URLS } from "@/shared/urls";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type UserAuthButtonsProps = {
  session: {
    user: UserSession;
  };
};

export function UserAuthButtons({ session }: UserAuthButtonsProps) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: URLS.signIn });
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <ThemeToggler />
        <UserButton session={session} />
      </div>
    </>
  );
}

function UserButton({ session }: UserAuthButtonsProps) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: URLS.signIn });
    setLoading(false);
  };

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Image
            src={session.user?.image || ""}
            alt={session.user?.name || ""}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span>{session.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={URLS.profile}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
          {loading ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
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
