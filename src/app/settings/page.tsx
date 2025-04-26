import { guardedRoute } from "@/lib/auth.server";
import { SettingsPageContent } from "@/modules/settings/pages/settings-page";
import { appName } from "@/shared/flags";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Settings | ${appName}`,
  description: "Manage your PocketPulse settings",
};

export default async function SettingsPage() {
  const dbUser = await guardedRoute();

  return <SettingsPageContent />;
}
