"use client";

import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "../Tooltip";

type NavLinksProps = {
  className?: string;
};

const navLinks = [
  {
    name: "Dashboard",
    href: URLS.home,
  },
  {
    name: "Settings",
    href: URLS.settings,
  },
];

export function NavLinks({ className }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-6", className)}>
      {navLinks.map((link) => {
        const active = link.href === pathname;

        return (
          <li key={link.name}>
            <Tooltip content={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "capitalize font-medium transition-colors text-muted-foreground hover:text-primary",
                  active ? "text-primary" : ""
                )}>
                {link.name}
              </Link>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
}
