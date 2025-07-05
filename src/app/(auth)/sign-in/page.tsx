import { SignInPageContent } from "@/modules/user/pages/SignInPageContent";
import { appName } from "@/shared/environments";

export const metadata = {
  title: `Sign In | ${appName}`,
  description: "Sign in page for PocketPulse",
};

export default async function SignInPage() {
  // await reverseGuardedRoute();

  return <SignInPageContent />;
}
