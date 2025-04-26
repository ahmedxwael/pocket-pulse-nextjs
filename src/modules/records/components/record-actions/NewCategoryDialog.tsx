"use client";

import { SubmitButton, TextInput } from "@/design-system/components/Form";
import { SwitchInput } from "@/design-system/components/Form/SwitchInput";
import { Button } from "@/design-system/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { Label } from "@/design-system/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mainCategories } from "../../data";

type InputFields = {
  name: string;
  category?: string;
  subCategory: boolean;
};

export function NewCategoryDialog() {
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
          className="rounded-full">
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
            <Select defaultValue={mainCategories[0].value}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <SelectTrigger
                  id="category"
                  className="w-full sm:w-1/2 max-w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
              </div>
              <SelectContent>
                {mainCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <SubmitButton className="grow sm:grow-0 sm:min-w-[120px]" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
