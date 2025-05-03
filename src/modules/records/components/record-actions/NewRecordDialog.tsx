"use client";

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
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectCategory } from "./SelectCategory";

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
    setValue,
  } = useForm<InputFields>();

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    // console.log(data);
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
            min={1}
            register={register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
            error={errors.amount?.message}
          />
          <SelectInput
            id="type"
            label="Type"
            defaultValue="INCOME"
            options={["INCOME", "EXPENSE", "SAVING", "TRANSFER", "ALLOCATION"]}
            onValueChange={(value) => setValue("type", value)}
            required
          />
          <SelectCategory />

          <SubmitButton className="grow sm:grow-0 sm:min-w-[120px]" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
