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
    color: "#22C55E",
  },
  expense: {
    label: "Expense",
    color: "#DC2626",
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
    <div className="p-4 flex flex-col gap-6 rounded-xl border w-full">
      <Tabs
        onTabChange={(tab) => setActiveTab(tab.value)}
        tabs={tabs}
        disabled
      />
      <ChartContainer
        config={chartConfig}
        className="sm:h-[600px] h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="5 5" />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            domain={[0, maxY * 1.2]}
          />
          <XAxis
            dataKey={activeTab === "yearly" ? "month" : "day"}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="income" fill={chartConfig.income.color} radius={5} />
          <Bar dataKey="expense" fill={chartConfig.expense.color} radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
