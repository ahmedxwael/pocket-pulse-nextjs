"use client";

import { toastError, toastSuccess } from "@/design-system/components";
import {
  IntegerInput,
  SelectInput,
  SubmitButton,
  TextInput,
} from "@/design-system/components/Form";
import { Button } from "@/design-system/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { loadingOverlayStore } from "@/design-system/stores";
import { useUser } from "@/modules/user/hooks";
import { validateFields } from "@/shared/utils";
import { Type } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createRecordAction } from "../../actions";
import { SelectCategory } from "./SelectCategory";

type InputFields = {
  description: string;
  amount: number;
  targetAmount?: number;
  categoryId: string;
  type: Type;
};

export function NewRecordDialog() {
  const { user } = useUser({ init: true });

  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setLoading } = loadingOverlayStore();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setValue,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    const { errors } = validateFields(data, ["description", "amount", "type"]);

    if (errors.length > 0) {
      return errors.map((error) => toastError(error.message));
    }

    if (
      user?.balance !== undefined &&
      user.balance < Number(data.amount) &&
      data.type === "EXPENSE"
    ) {
      return toastError("Insufficient balance");
    }

    try {
      setLoading(true);
      await createRecordAction({
        data: {
          ...data,
          amount: Number(data.amount),
        },
        include: {
          category: true,
        },
      });
      toastSuccess("Record created successfully");
      setDialogOpen(false);
      reset();
      router.refresh();
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) reset();
      }}>
      <DialogTrigger asChild>
        <Button className="capitalize font-semibold" size="lg">
          New record
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New record</DialogTitle>
          <DialogDescription>
            Add a new record to your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <TextInput
            id="description"
            label="Description"
            placeholder="eg. Birthday gift!"
            required
            register={register("description", {
              required: "Description is required",
              minLength: {
                value: 3,
                message: "Description must be at least 3 characters",
              },
            })}
            error={errors.description?.message}
            disabled={isSubmitting}
          />
          <IntegerInput
            id="amount"
            label="Amount"
            placeholder="100"
            required
            min={1}
            register={register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
            error={errors.amount?.message}
            disabled={isSubmitting}
          />
          <SelectInput
            id="type"
            label="Type"
            defaultValue="INCOME"
            options={[
              { label: "Income", value: "INCOME" },
              { label: "Expense", value: "EXPENSE" },
              { label: "Saving", value: "SAVING" },
              { label: "Transfer", value: "TRANSFER" },
              { label: "Allocation", value: "ALLOCATION" },
            ]}
            onValueChange={(value) => setValue("type", value as Type)}
            onInit={(value) => setValue("type", value as Type)}
            required
            disabled={isSubmitting}
          />
          <SelectCategory
            onChange={(value) => setValue("categoryId", value)}
            disabled={isSubmitting}
          />
          <SubmitButton
            className="grow sm:grow-0 sm:min-w-[120px]"
            disabled={isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
