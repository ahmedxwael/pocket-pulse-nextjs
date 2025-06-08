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
  where?: Prisma.RecordWhereUniqueInput;
  select?: Prisma.RecordSelect;
  include?: Prisma.RecordInclude;
  omit?: Prisma.RecordOmit;
  orderBy?: Prisma.RecordOrderByWithRelationInput;
  skip?: number;
  take?: number;
  cursor?: Prisma.RecordWhereUniqueInput;
  distinct?: Prisma.RecordScalarFieldEnum[];
};

export type RecordGeneralParams = {
  where?: Prisma.RecordWhereUniqueInput;
  select?: Prisma.RecordSelect;
  include?: Prisma.RecordInclude;
  omit?: Prisma.RecordOmit;
};

export type RecordPostParams = {
  data: any;
  select?: Prisma.RecordSelect;
  include?: Prisma.RecordInclude;
  omit?: Prisma.RecordOmit;
};

export type RecordPutParams = {
  where?: Prisma.RecordWhereUniqueInput;
  data: any;
  select?: Prisma.RecordSelect;
  include?: Prisma.RecordInclude;
  omit?: Prisma.RecordOmit;
};
