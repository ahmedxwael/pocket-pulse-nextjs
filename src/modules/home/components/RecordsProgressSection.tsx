import { NoData } from "@/design-system/components";
import { getRecordsService } from "@/modules/records/services";

export async function RecordsProgressSection() {
  const { data } = await getRecordsService({
    include: {
      category: true,
    },
  });

  console.log("data: ", data);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">Records Log</h2>
      <div className="border rounded-xl p-2">
        {data && data.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.map((record) => (
              <div key={record.id} className="flex gap-4">
                <div className="w-1/12">{record.type}</div>
                <div className="w-11/12 flex gap-4">
                  <div className="w-1/2">{record.description}</div>
                  <div className="w-1/2">{record.category?.name}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData
            title="No records found"
            description="Add your first record to see your progress"
          />
        )}
      </div>
    </div>
  );
}
