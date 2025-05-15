"use client";

import {
  SelectInput,
  SubmitButton,
  TextInput,
} from "@/design-system/components/Form";
import { Button } from "@/design-system/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCategories } from "../../hooks";
import { Type } from "../../types";

type InputFields = {
  name: string;
  type: Type;
};

export function NewCategoryDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { add } = useCategories();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    await add({
      name: data.name,
      type: data.type,
      createdById: "",
    });

    setDialogOpen(false);
    reset();
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

          <SubmitButton className="grow sm:grow-0 sm:min-w-[120px]" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
