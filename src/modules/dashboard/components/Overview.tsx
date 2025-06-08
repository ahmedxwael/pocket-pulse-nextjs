import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { format } from "date-fns";

interface OverviewProps {
  income: number;
  expense: number;
}

export function Overview({ income, expense }: OverviewProps) {
  const total = income - expense;
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              This Month: {format(monthStart, "MMM yyyy")}
            </p>
            <p className="text-2xl font-bold text-green-600">
              +${income.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              This Month: {format(monthStart, "MMM yyyy")}
            </p>
            <p className="text-2xl font-bold text-red-600">
              -${expense.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Net Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              This Month: {format(monthStart, "MMM yyyy")}
            </p>
            <p
              className={`text-2xl font-bold ${
                total >= 0 ? "text-green-600" : "text-red-600"
              }`}>
              ${total.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
