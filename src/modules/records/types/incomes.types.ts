import { User } from "@/modules/user/types";
import { Prisma } from "@prisma/client";
import { Category } from ".";

export type Income = {
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

export type IncomesParams = {
  where?: Prisma.IncomeWhereUniqueInput;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
  orderBy?: Prisma.IncomeOrderByWithRelationInput;
  skip?: number;
  take?: number;
  cursor?: Prisma.IncomeWhereUniqueInput;
  distinct?: Prisma.IncomeScalarFieldEnum[];
};

export type IncomesGeneralParams = {
  where?: Prisma.IncomeWhereUniqueInput;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
};

export type IncomesPostParams = {
  data: any;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
};

export type IncomesPutParams = {
  where?: Prisma.IncomeWhereUniqueInput;
  data: any;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
};
