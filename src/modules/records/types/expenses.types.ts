import { User } from "@/modules/user/types";
import { Category, Goal } from ".";

export type Expense = {
  id: string;
  title: string;
  note: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  userId: string;
  category?: Category;
  categoryId?: number;
  goal?: Goal;
  goalId?: number;
};

export type ExpenseData = {
  title: string;
  note: string;
  amount: number;
  categoryId?: number;
  goalId?: number;
};

export type ExpenseResponse = {
  data: Expense | null;
  message: string;
  error: any;
};

export type ExpensesListResponse = {
  data: Expense[];
  message: string;
  error: any;
};
