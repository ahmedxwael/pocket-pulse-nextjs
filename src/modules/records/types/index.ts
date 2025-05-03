import { User } from "@/modules/user/types";

export type Record = {
  id: string;
  description: string;
  amount: number;
  targetAmount?: number;
  category: Category;
  type: Type;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  userId: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: string;
  records?: Record[];
  subCategories?: Category[];
  parentId: string;
  parent?: Category;
  type: Type;
};

export type Type = "INCOME" | "EXPENSE" | "SAVING" | "TRANSFER" | "ALLOCATION";
