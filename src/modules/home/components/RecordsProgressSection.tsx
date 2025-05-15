import { getRecordsAction } from "@/modules/records/actions";
import { RecordsHistoryTable } from "./RecordsHistoryTable";

export async function RecordsProgressSection() {
  const { data } = await getRecordsAction({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">Records History</h2>
      <RecordsHistoryTable data={data} />
    </div>
  );
}
