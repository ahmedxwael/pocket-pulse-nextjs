"use client";

import { SelectInput } from "@/design-system/components";
import { useCategories } from "../../hooks";
import { NewCategoryDialog } from "./NewCategoryDialog";

export function SelectCategory() {
  const { categories } = useCategories();

  return (
    <div className="flex items-center gap-2">
      <SelectInput
        id="category"
        label="Category"
        defaultValue={categories[0]?.id}
        placeholder="Select Category"
        options={categories.map((category) => category.name)}>
        <NewCategoryDialog />
      </SelectInput>
    </div>
  );
}
