import { NavLinks } from "@/design-system/components";
import { AppLogo, UserButtons } from "./components";

export function Header() {
  return (
    <header className="sticky z-50 top-0 w-full border-b bg-background/80 backdrop-blur-sm">
      <nav className="container flex items-center justify-between gap-10 py-4">
        <AppLogo />
        <NavLinks className="mr-auto hidden md:flex" />
        <UserButtons />
      </nav>
    </header>
  );
}
