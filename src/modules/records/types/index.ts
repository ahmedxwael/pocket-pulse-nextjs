import { User } from "@/modules/user/types";
import { Prisma } from "@prisma/client";

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

export type RecordGeneralParams = {
  where: Prisma.RecordWhereUniqueInput;
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
  where: Prisma.RecordWhereUniqueInput;
  data: any;
  select?: Prisma.RecordSelect;
  include?: Prisma.RecordInclude;
  omit?: Prisma.RecordOmit;
};
