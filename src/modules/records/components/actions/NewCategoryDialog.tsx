"use client";

import { toastError, toastSuccess } from "@/design-system/components";
import { SubmitButton, TextInput } from "@/design-system/components/Form";
import { Button } from "@/design-system/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { useUser } from "@/modules/user/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCategories } from "../../hooks";

type InputFields = {
  name: string;
};

export function NewCategoryDialog() {
  const { user } = useUser();

  const [dialogOpen, setDialogOpen] = useState(false);
  const { add } = useCategories();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    if (!user) return;

    try {
      await add({
        name: data.name,
        createdById: user.id,
      });

      setDialogOpen(false);
      toastSuccess("Category created successfully");
      reset();
    } catch (e) {
      toastError("Couldn't add the category");
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
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full capitalize">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <TextInput
            id="name"
            label="Name"
            name="name"
            placeholder="eg. Books Savings"
            required
            register={register("name", {
              required: "Category name is required!",
            })}
            error={errors.name?.message}
          />
          <SubmitButton className="grow sm:grow-0 sm:min-w-[120px]" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
