import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Progress } from "@/design-system/components/ui/progress";
import { Goal } from "@/prisma/app/generated/prisma/client";
import { format } from "date-fns";

export function GoalsProgress() {
  const goals: Goal[] = [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.title}</span>
                <span className="text-sm text-muted-foreground">
                  {format(goal.deadline, "MMM dd")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Target: ${goal.targetAmount}</span>
                <span>Current: ${goal.currentAmount}</span>
              </div>
              <Progress
                value={(goal.currentAmount / goal.targetAmount) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
