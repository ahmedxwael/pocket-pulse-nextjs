import { LoadingOverlay } from "@/design-system/components";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ReactNode } from "react";
import { Header } from "../Header";

type BaseLayoutProps = {
  children: ReactNode;
};

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <Header />
      <LoadingOverlay />
      {children}
    </ThemeProvider>
  );
}
