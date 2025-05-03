import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { ComponentType } from "react";

export const recordsData = [
  { income: 1000, expense: 100, month: 3, day: 10 },
  { income: 4000, expense: 500, month: 4, day: 10 },
  { income: 1000, expense: 100, month: 5, day: 10 },
  { income: 5000, expense: 200, month: 6, day: 10 },
  { income: 1000, expense: 400, month: 7, day: 10 },
  { income: 1000, expense: 100, month: 8, day: 10 },
];

export type OverviewData = {
  title: string;
  value: number;
  icon: ComponentType;
  variant?: "default" | "destructive" | "success";
};

export const overviewData = (values: {
  income: number;
  expense: number;
  balance: number;
}): OverviewData[] => [
  {
    title: "Income",
    value: values.income,
    icon: TrendingUp,
    variant: "success",
  },
  {
    title: "Expense",
    value: values.expense,
    icon: TrendingDown,
    variant: "destructive",
  },
  {
    title: "Balance",
    value: values.balance,
    icon: Wallet,
  },
];
