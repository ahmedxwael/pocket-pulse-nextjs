"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectInputProps<T extends string> = {
  id?: string;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  setError?: (error: string) => void;
  required?: boolean;
  options: T[];
  children?: ReactNode;
};

export function SelectInput<T extends string>({
  id,
  defaultValue,
  label,
  error,
  required,
  options,
  children,
  placeholder,
  ...props
}: SelectInputProps<T>) {
  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label htmlFor={id} className={cn(error && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <Select {...props} defaultValue={defaultValue} required={required}>
        <div className="flex items-center gap-2">
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={placeholder || "Select an option"}
              defaultValue={defaultValue}
            />
          </SelectTrigger>
          {children}
        </div>
        <SelectContent>
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="no-options">
              No options
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
