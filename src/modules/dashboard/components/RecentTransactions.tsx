import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Record } from "@/modules/records/types";
import { format } from "date-fns";
import { Link } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Record[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  <span className="text-sm">{transaction.category?.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(transaction.createdAt, "MMM dd")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{transaction.description}</span>
                <span className="font-medium text-foreground">
                  {transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
