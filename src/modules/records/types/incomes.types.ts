import { User } from "@/modules/user/types";
import { GenericObject } from "@/shared/types";
import { Category, Goal } from ".";

export type Income = {
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

export type IncomeData = {
  title: string;
  note: string;
  amount: number;
  categoryId?: number;
  goalId?: number;
};

export type IncomeResponse = {
  data: Income | null;
  message: string;
  error: any;
};

export type IncomesListResponse = {
  data: Income[];
  message: string;
  error: any;
};

export type Params = GenericObject;
