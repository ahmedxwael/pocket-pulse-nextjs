import { User } from "@/modules/user/types";
import { Prisma } from "@prisma/client";
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

export type CategoriesParams = {
  where?: Prisma.CategoryWhereUniqueInput;
  select?: Prisma.CategorySelect;
  include?: Prisma.CategoryInclude;
  omit?: Prisma.CategoryOmit;
  orderBy?: Prisma.CategoryOrderByWithRelationInput;
  skip?: number;
  take?: number;
  cursor?: Prisma.CategoryWhereUniqueInput;
  distinct?: Prisma.CategoryScalarFieldEnum[];
};

export type CategoryGeneralParams = {
  where?: Prisma.CategoryWhereUniqueInput;
  select?: Prisma.CategorySelect;
  include?: Prisma.CategoryInclude;
  omit?: Prisma.CategoryOmit;
};

export type CategoryPostParams = {
  data: any;
  select?: Prisma.CategorySelect;
  include?: Prisma.CategoryInclude;
  omit?: Prisma.CategoryOmit;
};

export type CategoryPutParams = {
  where?: Prisma.CategoryWhereUniqueInput;
  data: any;
  select?: Prisma.CategorySelect;
  include?: Prisma.CategoryInclude;
  omit?: Prisma.CategoryOmit;
};
