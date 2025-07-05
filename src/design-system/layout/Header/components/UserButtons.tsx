import { ThemeToggler } from "@/design-system/components";
import { UserAuthButtons } from "@/modules/user/components";
import { NavLinksDrawer } from "./NavLinksDrawer";

export function UserButtons() {
  return (
    <div className="flex items-center gap-2">
      <UserAuthButtons />
      <ThemeToggler />
      <NavLinksDrawer />
    </div>
  );
}
