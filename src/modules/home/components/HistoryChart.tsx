"use client";

import { Tabs } from "@/design-system/components";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/design-system/components/ui/chart";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { recordsData } from "../data";
import { Tab } from "../types";
import { getRecordsChartData } from "../utils";

const chartData = getRecordsChartData(recordsData);

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--primary)",
  },
  expense: {
    label: "Expense",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

const tabs: Tab[] = [
  {
    title: "Yearly",
    value: "yearly",
    active: true,
  },
  {
    title: "Monthly",
    value: "monthly",
    active: false,
  },
];

export function HistoryChart() {
  const maxY = Math.max(...chartData.map((item) => item.income));
  const [activeTab, setActiveTab] = useState<string | undefined>(tabs[0].value);

  return (
    <div className="p-4 flex flex-col gap-6 rounded-xl border w-full bg-background/80">
      <Tabs
        onTabChange={(tab) => setActiveTab(tab.value)}
        tabs={tabs}
        disabled
      />
      <ChartContainer
        config={chartConfig}
        className="sm:h-[600px] h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid
            vertical={false}
            strokeDasharray="5 5"
            stroke="var(--border)"
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            domain={[0, maxY * 1.2]}
            stroke="var(--muted-foreground)"
          />
          <XAxis
            dataKey={activeTab === "yearly" ? "month" : "day"}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
            stroke="var(--muted-foreground)"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="income" fill="var(--primary)" radius={5} />
          <Bar dataKey="expense" fill="var(--secondary)" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
