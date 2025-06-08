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
    icon: "home",
  },
  {
    name: "Transactions",
    href: URLS.transactions,
    icon: "transactions",
    subItems: [
      { name: "Incomes", href: `${URLS.transactions}/incomes` },
      { name: "Expenses", href: `${URLS.transactions}/expenses` },
    ],
  },
  {
    name: "Goals",
    href: URLS.goals,
    icon: "goals",
  },
  {
    name: "Categories",
    href: URLS.categories,
    icon: "categories",
  },
  {
    name: "Settings",
    href: URLS.settings,
    icon: "settings",
  },
];

export function NavLinks({ className, styles }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-6", className, styles?.root)}>
      {navLinks.map((link) => {
        const active = link.href === pathname;
        const isActiveSection = link.subItems
          ? link.subItems.some((sub) => sub.href === pathname)
          : false;

        return (
          <li key={link.name} className="w-full">
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-2 capitalize font-medium p-2 transition-colors text-muted-foreground hover:text-primary",
                active || isActiveSection ? "text-primary" : "",
                styles?.link
              )}>
              <span className="w-4 h-4" aria-hidden="true">
                {link.icon}
              </span>
              {link.name}
              {link.subItems && (
                <span className="ml-1 text-xs">
                  {link.subItems.find((sub) => sub.href === pathname)
                    ? "↓"
                    : "→"}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
