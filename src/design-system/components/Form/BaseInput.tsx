"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type BaseInputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
};

export function BaseInput({
  id,
  type,
  label,
  error,
  required,
  register,
  ...props
}: BaseInputProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <Label htmlFor={id} className={cn(error && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input id={id} type={type} register={register} {...props} />
      {error && <span className="text-destructive text-sm">{error}</span>}
    </div>
  );
}
