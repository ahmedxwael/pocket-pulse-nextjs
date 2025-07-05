import { RecentRecords } from "./RecentRecords";

export function RecentTransactions() {
  return (
    <div className="flex flex-col gap-8">
      <RecentRecords type="incomes" />
      <RecentRecords type="expenses" />
    </div>
  );
}
