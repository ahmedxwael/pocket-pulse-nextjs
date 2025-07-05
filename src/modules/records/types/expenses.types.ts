import { User } from "@/modules/user/types";
import { Prisma } from "@prisma/client";
import { Category } from ".";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  userId: string;
  category?: Category;
  categoryId?: string;
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

export type ExpensesParams = {
  where?: Prisma.ExpenseWhereUniqueInput;
  select?: Prisma.ExpenseSelect;
  include?: Prisma.ExpenseInclude;
  omit?: Prisma.ExpenseOmit;
  orderBy?: Prisma.ExpenseOrderByWithRelationInput;
  skip?: number;
  take?: number;
  cursor?: Prisma.ExpenseWhereUniqueInput;
  distinct?: Prisma.ExpenseScalarFieldEnum[];
};

export type ExpensesGeneralParams = {
  where?: Prisma.ExpenseWhereUniqueInput;
  select?: Prisma.ExpenseSelect;
  include?: Prisma.ExpenseInclude;
  omit?: Prisma.ExpenseOmit;
};

export type ExpensesPostParams = {
  data: any;
  select?: Prisma.ExpenseSelect;
  include?: Prisma.ExpenseInclude;
  omit?: Prisma.ExpenseOmit;
};

export type ExpensesPutParams = {
  where?: Prisma.ExpenseWhereUniqueInput;
  data: any;
  select?: Prisma.ExpenseSelect;
  include?: Prisma.ExpenseInclude;
  omit?: Prisma.ExpenseOmit;
};
