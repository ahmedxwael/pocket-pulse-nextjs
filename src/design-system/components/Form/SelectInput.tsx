"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectInputProps<T extends { label: string; value: string }> = {
  id?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onInit: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  setError?: (error: string) => void;
  isLoading?: boolean;
  required?: boolean;
  options: T[];
  children?: ReactNode;
};

export function SelectInput<T extends { label: string; value: string }>({
  id,
  defaultValue,
  label,
  error,
  required,
  options,
  children,
  placeholder,
  onValueChange,
  onInit,
  isLoading,
  ...props
}: SelectInputProps<T>) {
  useEffect(() => {
    if (defaultValue) {
      onInit(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label htmlFor={id} className={cn(error && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <Select
        {...props}
        onValueChange={(categoryId) => onValueChange?.(categoryId)}
        defaultValue={defaultValue}>
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
          {isLoading ? (
            <SelectItem disabled value="loading">
              Loading...
            </SelectItem>
          ) : options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
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
