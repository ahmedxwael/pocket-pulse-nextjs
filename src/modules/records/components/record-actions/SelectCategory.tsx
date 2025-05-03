import { Select } from "@/design-system/components/ui/select";

export function SelectCategory() {
  const { categories } = useCategories();

	return <Select defaultValue={mainCategories[0].value}>
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
}