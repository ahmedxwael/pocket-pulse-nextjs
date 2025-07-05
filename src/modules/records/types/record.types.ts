import { User } from "@/modules/user/types";
import { Prisma } from "@prisma/client";
import { Category } from ".";

export type Record = {
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

export type RecordResponse = {
  data: Record | null;
  message: string;
  error: any;
};

export type RecordListResponse = {
  data: Record[];
  message: string;
  error: any;
};

export type RecordsParams = {
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

export type RecordGeneralParams = {
  where?: Prisma.IncomeWhereUniqueInput;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
};

export type RecordPostParams = {
  data: any;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
};

export type RecordPutParams = {
  where?: Prisma.IncomeWhereUniqueInput;
  data: any;
  select?: Prisma.IncomeSelect;
  include?: Prisma.IncomeInclude;
  omit?: Prisma.IncomeOmit;
};
