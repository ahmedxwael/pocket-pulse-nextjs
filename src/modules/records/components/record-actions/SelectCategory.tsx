"use client";

import { SelectInput } from "@/design-system/components";
import { useCategories } from "@/modules/records/hooks";
import { NewCategoryDialog } from "./NewCategoryDialog";

type SelectCategoryProps = {
  onChange?: (category: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  options?: { label: string; value: string }[];
};

export function SelectCategory({
  onChange,
  disabled = false,
  className,
  defaultValue,
  options,
}: SelectCategoryProps) {
  const { categories, load, loading } = useCategories();

  return (
    <div className="flex items-center gap-2">
      <SelectInput
        id="category"
        label="Category"
        disabled={disabled}
        className={className}
        onValueChange={onChange}
        onInit={(value) => onChange?.(value)}
        onOpenChange={load}
        isLoading={loading}
        defaultValue={defaultValue}
        placeholder="Select Category"
        options={
          options ||
          categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        }>
        <NewCategoryDialog />
      </SelectInput>
    </div>
  );
}
