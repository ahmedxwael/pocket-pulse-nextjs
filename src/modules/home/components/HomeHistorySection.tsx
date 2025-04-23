import { HistoryChart } from "./HistoryChart";

export function HomeHistorySection() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <HistoryChart />
    </div>
  );
}
