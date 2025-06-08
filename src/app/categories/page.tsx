import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { getCategoriesAction } from "@/modules/records/actions";
import { NewCategoryDialog } from "@/modules/records/components/actions/NewCategoryDialog";

export default async function CategoriesPage() {
  const { data: categories } = await getCategoriesAction();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <NewCategoryDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories
          ? categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span>Incomes:</span>
                      <span>{category.incomes.length}</span>
                    </div>
                    <span>Expenses:</span>
                    <span>{category.expenses.length}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          : null}
      </div>
    </div>
  );
}
