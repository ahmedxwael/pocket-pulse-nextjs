"use client";

import { Button, buttonVariants } from "@/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/design-system/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
      { name: "Incomes", href: URLS.transactions.incomes },
      { name: "Expenses", href: URLS.transactions.expenses },
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
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <ul className={cn("flex items-center gap-6", className, styles?.root)}>
      {navLinks.map((link) => {
        const active = link.href === pathname;

        return (
          <li key={link.name} className="w-full">
            {link.subItems ? (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className={cn("hover:no-underline hover:text-primary", {
                      "text-primary": active,
                      "text-muted-foreground": !active,
                    })}>
                    {link.name}
                    <ChevronDown
                      className={cn("transition", { "rotate-180": open })}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.subItems.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.name}
                      className="cursor-pointer hover:text-primary"
                      onClick={() => router.push(subItem.href)}>
                      {subItem.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  cn({
                    "text-primary": active,
                    "text-muted-foreground hover:text-primary": !active,
                  }),
                  styles?.link
                )}>
                {link.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
