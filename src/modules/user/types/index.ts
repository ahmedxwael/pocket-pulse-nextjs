import { Category, Record } from "@/modules/records/types";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  balance: number;
  records: Record[];
  categories: Category[];
  provider: string;
  emailVerified: boolean;
  image: string;
};

export type Role = "USER" | "ADMIN";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  balance: number;
  isVerified: boolean;
  createdAt: Date;
} | null;
