"use client";

import { cn } from "@/lib/utils";
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
};

export function SelectInput<T extends string>({
  id,
  defaultValue,
  label,
  error,
  required,
  options,
  ...props
}: SelectInputProps<T>) {
  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label htmlFor={id} className={cn(error && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <Select defaultValue={defaultValue} {...props}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder="Select an option"
            defaultValue={defaultValue}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
