import { BaseLayout, NewUserLayout } from "@/design-system/layout";
import { cn } from "@/lib/utils";
import { getUser } from "@/modules/user/actions";
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
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative antialiased overflow-x-hidden",
          montserrat.variable
        )}>
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {user && user.newUser ? (
            <NewUserLayout />
          ) : (
            <BaseLayout>{children}</BaseLayout>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
