import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLDivElement>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div className="flex">
      <div
        className={cn(
          "w-7 h-7 animate-spin rounded-full border-2 border-muted-foreground border-b-transparent",
          className
        )}
        {...props}
      />
    </div>
  );
}
