import { GlowingElements, LoadingOverlay } from "@/design-system/components";
import { BaseLayout } from "@/design-system/layout";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/modules/user/actions";
import { UserProvider } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { appName } from "@/shared/flags";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appName,
  description:
    "PocketPulse is a budgeting app that helps you manage your finances",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("relative antialiased", montserrat.variable)}>
        <GlowingElements />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <LoadingOverlay />
          <UserProvider user={user}>
            <BaseLayout>{children}</BaseLayout>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
