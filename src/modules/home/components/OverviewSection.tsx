import { cn } from "@/lib/utils";
import { getUser } from "@/modules/user/utils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

type OverviewData = {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

const variants = {
  default: "bg-primary/20 text-primary",
  destructive: "bg-destructive/20 text-destructive",
  success: "bg-success/20 text-success",
};

export async function OverviewSection() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const overviewData: OverviewData[] = [
    {
      title: "Income",
      value: user.incomesCount,
      icon: <TrendingUp size={30} />,
      variant: "success",
    },
    {
      title: "Expense",
      value: user.expensesCount,
      icon: <TrendingDown size={30} />,
      variant: "destructive",
    },
    {
      title: "Balance",
      value: user.balance,
      icon: <Wallet size={30} />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="flex gap-4 flex-col sm:flex-row">
        {overviewData.map((item) => (
          <OverviewItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function OverviewItem({
  title,
  value,
  icon,
  variant = "default",
}: OverviewData) {
  return (
    <div className="flex items-center rounded-xl border p-4 gap-2 grow">
      <span className={cn("p-3 rounded-lg", variants[variant])}>{icon}</span>
      <div className="flex flex-col gap-1">
        <h3 className="text-muted-foreground text-sm">{title}</h3>
        <p className="text-xl font-bold">${value?.toFixed(1)}</p>
      </div>
    </div>
  );
}
