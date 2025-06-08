import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/ui/tabs";

export default async function TransactionsPage() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="incomes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="incomes">
          <div className="space-y-4">
            {/* <NewTransaction type="income" />
            <TransactionList transactions={incomes} type="income" /> */}
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="space-y-4">
            {/* <NewTransaction type="expense" />
            <TransactionList transactions={expenses} type="expense" /> */}
          </div>
        </TabsContent>

        <TabsContent value="savings">
          <div className="space-y-4">
            {/* <NewTransaction type="saving" />
            <TransactionList transactions={savings} type="saving" /> */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
