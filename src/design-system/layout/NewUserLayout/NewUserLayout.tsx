"use client";

import { toastSuccess } from "@/design-system/components";
import {
  IntegerInput,
  SelectInput,
  SubmitButton,
} from "@/design-system/components/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { getUser, updateUserAction } from "@/modules/user/actions";
import { User } from "@/modules/user/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type InputFields = {
  balance: number;
  currency: string;
};

export function NewUserLayout() {
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const onSubmit = async (data: InputFields) => {
    if (!user) return;

    console.log(data);

    try {
      await updateUserAction(user.id, {
        ...data,
        balance: Number(data.balance),
        newUser: false,
      });

      toastSuccess("Profile updated", {
        description: "Your preferences have been saved successfully!",
      });

      router.refresh();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <main className="relative min-h-dvh flex items-center justify-center py-10">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
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

            <SubmitButton className="w-full text-lg py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
              Save and Continue
            </SubmitButton>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-base text-muted-foreground">
          You can always change these settings later in your profile.
        </CardFooter>
      </Card>
    </main>
  );
}
