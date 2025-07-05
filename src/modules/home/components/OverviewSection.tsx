import { cn } from "@/lib/utils";
import { OverviewData } from "../data";

const variants = {
  default: "bg-primary/20 text-primary",
  destructive: "bg-destructive/20 text-destructive",
  success: "bg-success/20 text-success",
};

export async function OverviewSection() {
  return <div className="flex flex-col gap-4"></div>;
}

function OverviewItem({
  title,
  value,
  icon: Icon,
  variant = "default",
}: OverviewData) {
  return (
    <div className="flex items-center rounded-xl border p-4 gap-2 grow">
      <span className={cn("p-3 rounded-lg", variants[variant])}>
        <Icon />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-muted-foreground text-sm">{title}</h3>
        <p className="text-xl font-bold">${value?.toFixed(1)}</p>
      </div>
    </div>
  );
}
