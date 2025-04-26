import { Tooltip } from "@/design-system/components";
import { cn } from "@/lib/utils";
import { appName } from "@/shared/flags";
import { URLS } from "@/shared/urls";
import Link from "next/link";

type AppLogoProps = {
  className?: string;
};

export function AppLogo({ className }: AppLogoProps) {
  return (
    <Tooltip content="Home">
      <Link
        href={URLS.home}
        className={cn(
          "text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-extrabold",
          className
        )}>
        {appName}
      </Link>
    </Tooltip>
  );
}
