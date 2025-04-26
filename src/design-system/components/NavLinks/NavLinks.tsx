"use client";

import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  className?: string;
  styles?: {
    root?: string;
    link?: string;
  };
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

export function NavLinks({ className, styles }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-6", className, styles?.root)}>
      {navLinks.map((link) => {
        const active = link.href === pathname;

        return (
          <li key={link.name} className="w-full">
            <Link
              href={link.href}
              className={cn(
                "capitalize inline-block font-medium p-2 transition-colors text-muted-foreground hover:text-primary",
                active ? "text-primary" : "",
                styles?.link
              )}>
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
