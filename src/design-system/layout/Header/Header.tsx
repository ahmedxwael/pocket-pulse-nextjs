import { NavLinks, Tooltip } from "@/design-system/components";
import { requireAuth } from "@/lib/auth.server";
import { UserSession } from "@/modules/user/types";
import { appName } from "@/shared/flags";
import { URLS } from "@/shared/urls";
import Link from "next/link";
import { UserAuthButtons } from "./components";

export async function Header() {
  const { session } = await requireAuth();

  return (
    <header className="sticky z-50 top-0 w-full border-b bg-background/10 backdrop-blur-sm">
      <nav className="container flex items-center justify-between gap-10 py-4">
        <Tooltip content="Home">
          <Link
            href={URLS.home}
            className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-extrabold">
            {appName}
          </Link>
        </Tooltip>
        <NavLinks className="mr-auto hidden md:flex" />
        <UserAuthButtons session={session as UserSession} />
      </nav>
    </header>
  );
}
