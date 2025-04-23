import { reverseGuardedRoute } from "@/lib/auth.server";
import { SignInPageContent } from "@/modules/user/pages/SignInPageContent";
import { appName } from "@/shared/flags";

export const metadata = {
  title: `Sign In | ${appName}`,
  description: "Sign in page for PocketPulse",
};

export default async function SignInPage() {
  await reverseGuardedRoute();

  return <SignInPageContent />;
}
