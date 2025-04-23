"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BaseInputProps } from "./BaseInput";

type PasswordInputProps = BaseInputProps;

type Type = "password" | "text";

export function PasswordInput({
  id,
  label,
  error,
  required,
  register,
  ...props
}: PasswordInputProps) {
  const [type, setType] = useState<Type>("password");

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <Label htmlFor={id} className={cn(error && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="flex items-center relative gap-2">
        <Input id={id} type={type} register={register} {...props} />
        <Button
          variant="ghost"
          type="button"
          onClick={() =>
            setType((prev) => (prev === "password" ? "text" : "password"))
          }
          className="absolute right-0">
          {type === "password" ? <Eye /> : <EyeClosed />}
        </Button>
      </div>
      {error && <span className="text-destructive text-sm">{error}</span>}
    </div>
  );
}
