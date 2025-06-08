import { SignUpPageContent } from "@/modules/user/pages/SignUpPageContent";
import { appName } from "@/shared/environments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign Up | ${appName}`,
  description: "Sign up page for PocketPulse",
};

export default async function SignUpPage() {
  // await reverseGuardedRoute();

  return <SignUpPageContent />;
}
