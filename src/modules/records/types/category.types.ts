import { User } from "@/modules/user/types";
import { Expense, Income } from ".";

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: string;
  incomes: Income[];
  expenses: Expense[];
};

export type CategoryData = {
  name: string;
};

export type CategoryListResponse = {
  data: Category[] | null;
  message: string;
  error: string | null;
};

export type CategoryResponse = {
  data: Category | null;
  message: string;
  error: string | null;
};
