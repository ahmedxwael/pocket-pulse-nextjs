import { Category, Record } from "@/modules/records/types";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  balance: number;
  incomesCount: number;
  expensesCount: number;
  records?: Record[];
  categories?: Category[];
  provider: string;
  emailVerified: Date;
  isVerified: boolean;
  image: string;
};

export type Role = "USER" | "ADMIN";

export type UserSession = {
  user: User;
  expires: string;
} | null;
