import { NewRecordDialog } from "@/modules/records/components";
import { HomeHistorySection, OverviewSection } from "../../components";
import { RecordsProgressSection } from "../../components/RecordsProgressSection";

export function HomePageContent() {
  return (
    <section className="pb-8 flex flex-col gap-10">
      <div className="bg-muted/30 border-b py-6 ">
        <div className="flex items-center container justify-between gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <NewRecordDialog />
        </div>
      </div>
      <div className="container flex flex-col gap-10">
        <OverviewSection />
        <RecordsProgressSection />
        {/* <UpcomingTransactionsSection/> */}
        <HomeHistorySection />
      </div>
    </section>
  );
}
