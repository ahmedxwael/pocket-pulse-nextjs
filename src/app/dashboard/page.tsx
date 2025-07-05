import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";

export default async function DashboardPage() {
  // const today = new Date();
  // const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  // const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // const transactions: Record[] = [];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">
              {user?.currency} {user?.balance?.toFixed(2)}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">
              {user?.currency}{" "}
              {transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <Overview
              income={user?.incomesCount || 0}
              expense={user?.expensesCount || 0}
            /> */}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>{/* <QuickActions /> */}</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <RecentTransactions transactions={transactions} /> */}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Goals Progress</CardTitle>
          </CardHeader>
          <CardContent>{/* <GoalsProgress /> */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
