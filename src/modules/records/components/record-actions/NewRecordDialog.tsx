"use client";

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
import { Label } from "@/design-system/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { mainCategories } from "../../data";
import { NewCategoryDialog } from "./NewCategoryDialog";

type InputFields = {
  description: string;
  amount: number;
  targetAmount?: number;
  category: string;
  type: string;
};

export function NewRecordDialog() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    console.log(data);
  };

  return (
    <Dialog onOpenChange={() => reset()}>
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
          />
          <IntegerInput
            id="amount"
            label="Amount"
            placeholder="100"
            required
            register={register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
            error={errors.amount?.message}
          />
          <Select defaultValue={mainCategories[0].value}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <SelectTrigger
                  id="category"
                  className="w-full sm:w-1/2 max-w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <NewCategoryDialog />
              </div>
            </div>
            <SelectContent>
              {mainCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SubmitButton className="grow sm:grow-0 sm:min-w-[120px]" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
