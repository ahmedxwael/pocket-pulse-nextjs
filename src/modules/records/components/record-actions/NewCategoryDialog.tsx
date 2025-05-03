"use client";

import {
  SelectInput,
  SubmitButton,
  TextInput,
} from "@/design-system/components/Form";
import { SwitchInput } from "@/design-system/components/Form/SwitchInput";
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

type InputFields = {
  name: string;
  category?: string;
  subCategory: boolean;
};

export function NewCategoryDialog() {
  const { categories, loading, setCategories } = useCategories();
  const [subCategory, setSubCategory] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    // console.log(data);
  };

  console.log("categories: ", categories);

  return (
    <Dialog
      onOpenChange={() => {
        setSubCategory(false);
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

          <SwitchInput
            id="subCategory"
            label="Subcategory"
            name="subCategory"
            defaultChecked={false}
            onChange={(e) => setSubCategory(e.target.checked)}
            register={register("subCategory", {
              required: "Subcategory is required!",
            })}
          />
          {subCategory && (
            <SelectInput
              id="category"
              label="Category"
              defaultValue={categories[0]?.id}
              placeholder="Select Category"
              options={categories.map((category) => category.name)}
            />
          )}
          <SubmitButton className="grow sm:grow-0 sm:min-w-[120px]" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
