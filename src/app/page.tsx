import { guardedRoute } from "@/lib/auth.server";
import { HomePageContent } from "@/modules/home/pages/HomePageContent";
import { appName } from "@/shared/flags";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${appName}`,
  description: `Welcome to your ${appName} dashboard`,
  keywords: ["pocket pulse", "dashboard", "budget", "finance", "money"],
};

export default async function HomePage() {
  const session = await guardedRoute();

  return <HomePageContent />;
}
