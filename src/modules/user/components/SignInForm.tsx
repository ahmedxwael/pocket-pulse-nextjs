"use client";

import { loginAction } from "@/actions/auth";
import { toastError } from "@/design-system/components";
import { EmailInput, SubmitButton } from "@/design-system/components/Form";
import { Button } from "@/design-system/components/ui/button";
import { GithubIcon, GoogleIcon } from "@/design-system/icons";
import { appName } from "@/shared/flags";
import { URLS } from "@/shared/urls";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type InputFields = {
  email: string;
  password: string;
};

export function SignInForm() {
  const {
    register,
    formState: { errors },
  } = useForm<InputFields>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      await loginAction(provider);
    } catch (error) {
      toastError("Error signing in", {
        description: `Error signing in: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-full w-md">
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Welcome to {appName}.</h1>
            <div className="text-center text-sm flex items-center gap-1">
              <p className="text-muted-foreground">
                {"Don't have an account?"}
              </p>
              <Link href={URLS.signUp} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <EmailInput
            label="Email"
            placeholder="Enter your email"
            disabled
            register={register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address.",
              },
            })}
            error={errors.email?.message}
          />
          <SubmitButton disabled>Sign In</SubmitButton>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => handleLogin("github")}
              disabled={isLoading}>
              <GithubIcon />
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Continue with Github"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => handleLogin("google")}
              disabled={isLoading}>
              <GoogleIcon />
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Continue with Google"
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link href={URLS.termsOfService}>Terms of Service</Link> and{" "}
        <Link href={URLS.privacyPolicy}>Privacy Policy</Link>.
      </div>
    </div>
  );
}
