"use client";

import { Toaster } from "@/design-system/components/ui/sonner";
import { UserContext } from "@/providers";
import { ReactNode, useContext } from "react";
import { Header } from "../Header";
import { NewUserLayout } from "../NewUserLayout";

type BaseLayoutProps = {
  children: ReactNode;
};

export function BaseLayout({ children }: BaseLayoutProps) {
  const user = useContext(UserContext);

  if (user && user.newUser) {
    return <NewUserLayout />;
  }

  return (
    <main className="relative">
      <Header />
      <Toaster position="top-right" closeButton />
      {children}
    </main>
  );
}
