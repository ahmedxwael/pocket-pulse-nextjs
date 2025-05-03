import { User } from "@/modules/user/types";

export type Record = {
  id: string;
  description: string;
  amount: number;
  targetAmount?: number;
  category: Category;
  type: Type;
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: string;
  expenses?: Record[];
  subCategories?: Category[];
  parentId: string;
  parent?: Category;
  type: Type;
};

export type Type = "INCOME" | "EXPENSE" | "SAVING" | "TRANSFER" | "ALLOCATION";
