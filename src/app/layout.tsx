import { BaseLayout } from "@/design-system/layout/base-layout";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} relative antialiased`}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
