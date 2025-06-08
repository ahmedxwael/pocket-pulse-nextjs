import { Button } from "@/design-system/components/ui/button";
import { URLS } from "@/shared/urls";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();

  const handleNewRecord = (type: "income" | "expense") => {
    router.push(`${URLS.transactions}/${type}/new`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleNewRecord("income")}>
        <Plus className="w-4 h-4" />
        Add Income
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleNewRecord("expense")}>
        <Plus className="w-4 h-4" />
        Add Expense
      </Button>
    </div>
  );
}
