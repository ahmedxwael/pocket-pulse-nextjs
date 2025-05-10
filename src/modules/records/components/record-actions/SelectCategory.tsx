"use client";

import { SelectInput } from "@/design-system/components";
import { useCategories } from "../../hooks";
import { NewCategoryDialog } from "./NewCategoryDialog";

type SelectCategoryProps = {
  onChange?: (category: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  options?: string[];
};

export function SelectCategory({
  onChange,
  disabled = false,
  className,
  defaultValue,
  options,
}: SelectCategoryProps) {
  const { categories } = useCategories();

  return (
    <div className="flex items-center gap-2">
      <SelectInput
        id="category"
        label="Category"
        disabled={disabled}
        className={className}
        onValueChange={onChange}
        defaultValue={defaultValue || categories[0]?.id}
        placeholder="Select Category"
        options={options || categories.map((category) => category.name)}>
        <NewCategoryDialog />
      </SelectInput>
    </div>
  );
}
