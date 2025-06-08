import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { format } from "date-fns";

export default async function GoalsPage() {
  const goals: any[] = [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
        {/* <NewGoal /> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Target Amount:</span>
                  <span>{goal.targetAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Amount:</span>
                  <span>{goal.currentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span>{format(goal.deadline, "MMM dd, yyyy")}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(goal.currentAmount / goal.targetAmount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
