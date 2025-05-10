"use client";

import { toastError, toastSuccess } from "@/design-system/components";
import {
  IntegerInput,
  SelectInput,
  SubmitButton,
} from "@/design-system/components/Form";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { loadingOverlayStore } from "@/design-system/stores";
import { signOutAction as signOut } from "@/modules/auth/actions";
import { updateUser } from "@/modules/user/actions";
import { useUser } from "@/modules/user/hooks";
import { URLS } from "@/shared/urls";
import { ArrowLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type InputFields = {
  balance: number;
  currency: string;
};

export function NewUserLayout() {
  const { setLoading } = loadingOverlayStore();
  const { user, loading } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({
    defaultValues: {
      balance: 0,
      currency: "USD",
    },
  });

  const onSubmit = async (data: InputFields) => {
    if (!user) return;

    try {
      setLoading(true);
      await updateUser(user.id, {
        ...data,
        balance: Number(data.balance),
        newUser: false,
      });

      toastSuccess("Profile updated", {
        description: "Your preferences have been saved successfully!",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toastError("Error updating profile", {
        description: "There was an error updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
      redirect(URLS.signIn);
    }
  };

  return (
    <main className="relative min-h-dvh flex flex-col gap-6 items-center justify-center py-10">
      <Button
        onClick={handleLogout}
        className="group absolute top-10 left-10 flex items-center gap-2 capitalize">
        <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
        sign out
      </Button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Welcome to PocketPulse!
            </CardTitle>
            <CardDescription className="text-xl mt-3">
              {
                "Let's set up your account with some basic information to get started."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <SelectInput
                id="currency"
                label="Currency"
                defaultValue="USD"
                options={["USD", "POUND"]}
                onValueChange={(value) => setValue("currency", value)}
              />

              <IntegerInput
                id="balance"
                label="Initial Balance"
                placeholder="0"
                min={0}
                register={register("balance", {
                  min: {
                    value: 0,
                    message: "Balance cannot be negative",
                  },
                })}
                error={errors.balance?.message}
              />

              <SubmitButton
                disabled={loading}
                className="w-full py-3 text-md font-semibold h-auto">
                Save and Continue
              </SubmitButton>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-base text-muted-foreground">
            You can always change these settings later in your profile.
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
