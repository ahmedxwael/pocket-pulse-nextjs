"use client";

import { NavLinks } from "@/design-system/components";
import { Button } from "@/design-system/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { AppLogo } from "./AppLogo";

export function NavLinksDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b pb-4">
          <SheetTitle>
            <AppLogo />
          </SheetTitle>
        </SheetHeader>
        <NavLinks
          styles={{
            root: "flex-col gap-2 p-4",
            link: "p-1",
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
