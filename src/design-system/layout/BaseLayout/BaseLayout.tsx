import { LoadingOverlay } from "@/design-system/components";
import { Toaster } from "@/design-system/components/ui/sonner";
import { ReactNode } from "react";
import { Header } from "../Header";

type BaseLayoutProps = {
  children: ReactNode;
};

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="relative">
      <Header />
      <LoadingOverlay />
      <Toaster position="top-right" closeButton />
      {children}
    </main>
  );
}
