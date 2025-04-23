import { buttonVariants } from "@/design-system/components/ui/button";
import { cn } from "@/lib/utils";
import { appName } from "@/shared/flags";
import { URLS } from "@/shared/urls";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Not Found | ${appName}`,
};

export default function NotFound() {
  return (
    <section className="min-h-[calc(100dvh-69px)] flex items-center justify-center p-6">
      <div className="max-w-md bg-white text-secondary rounded-xl shadow-2xl p-8 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href={URLS.home}
          className={cn(buttonVariants({ variant: "secondary" }))}>
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
