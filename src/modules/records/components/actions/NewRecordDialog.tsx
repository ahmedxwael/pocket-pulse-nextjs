"use client";

import { loadingOverlayAtom } from "@/design-system/atoms";
import { toastError, toastSuccess } from "@/design-system/components";
import {
  IntegerInput,
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
import { useUser } from "@/modules/user/hooks";
import { validateFields } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputFields = {
  title: string;
  note: string;
  amount: number;
  targetAmount?: number;
  categoryId: string;
};

export function NewRecordDialog() {
  const { user } = useUser({ init: true });

  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setValue,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    const { errors } = validateFields(data, ["title", "note", "amount"]);

    if (errors.length > 0) {
      return errors.map((error) => toastError(error.message));
    }

    if (user?.balance !== undefined && user.balance < Number(data.amount)) {
      return toastError("Insufficient balance");
    }

    console.log("data", data);

    try {
      loadingOverlayAtom.start();
      // await createIncomeAction({
      //   amount: Number(data.amount),
      //   categoryId: Number(data.categoryId),
      //   note: data.note,
      //   title: data.title,
      // });
      toastSuccess("Record created successfully");
      setDialogOpen(false);
      reset();
      router.refresh();
    } catch (error: any) {
      console.log("error", error);
      toastError(error.message);
    } finally {
      loadingOverlayAtom.close();
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
            id="title"
            label="Title"
            placeholder="eg. Birthday gift!"
            required
            register={register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            error={errors.title?.message}
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
          {/* <SelectCategory
            onChange={(value) => setValue("categoryId", value)}
            disabled={isSubmitting}
          /> */}
          {/* <TextareaInput
            id="note"
            label="Note"
            placeholder="eg. Birthday gift!"
            required
            register={register("note", {
              required: "Note is required",
            })}
          /> */}
          <SubmitButton
            className="grow sm:grow-0 sm:min-w-[120px]"
            disabled={isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
