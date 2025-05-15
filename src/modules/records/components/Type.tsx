import { cn } from "@/lib";
import { Record as RecordType, Type as TypeType } from "../types";

type TypeProps = {
  record: RecordType;
  className?: string;
};

const variants: Record<TypeType, string> = {
  INCOME: "bg-green-100 text-green-800",
  EXPENSE: "bg-red-100 text-red-800",
  TRANSFER: "bg-blue-100 text-blue-800",
  ALLOCATION: "bg-yellow-100 text-yellow-800",
  SAVING: "bg-purple-100 text-purple-800",
};

export function Type({ record, className }: TypeProps) {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-semibold",
        variants[record.type],
        className
      )}>
      {record.type}
    </span>
  );
}
