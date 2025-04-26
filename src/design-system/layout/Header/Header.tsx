import { NavLinks } from "@/design-system/components";
import { requireAuth } from "@/lib/auth.server";
import { AppLogo, UserButtons } from "./components";

export async function Header() {
  const { user } = await requireAuth();

  return (
    <header className="sticky z-50 top-0 w-full border-b bg-background/10 backdrop-blur-sm">
      <nav className="container flex items-center justify-between gap-10 py-4">
        <AppLogo />
        <NavLinks className="mr-auto hidden md:flex" />
        <UserButtons user={user} />
      </nav>
    </header>
  );
}
