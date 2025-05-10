"use client";

import { SubmitButton, TextInput } from "@/design-system/components/Form";
import { Button } from "@/design-system/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCategories } from "../../hooks";

type InputFields = {
  name: string;
  category?: string;
  subCategory: boolean;
};

export function NewCategoryDialog() {
  const { categories } = useCategories();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    console.log(data);

    reset();
  };

  console.log("categories: ", categories);

  return (
    <Dialog
      onOpenChange={() => {
        reset();
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
