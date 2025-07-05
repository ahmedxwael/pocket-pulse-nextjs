import { getExpensesAction, getIncomesAction } from "@/modules/records/actions";

type RecentRecordsProps = {
  type: "incomes" | "expenses";
};

const service = {
  incomes: getIncomesAction,
  expenses: getExpensesAction,
};

export async function RecentRecords({ type }: RecentRecordsProps) {
  // const { data } = await service[type]({
  //   take: 5,
  // });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">Recent {type}</h2>
      {/* <RecordsHistoryTable data={data} /> */}
    </div>
  );
}
