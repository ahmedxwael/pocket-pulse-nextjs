import { User } from "@/modules/user/types";

export const USER_SESSION_KEY = "pocket-pulse-user";
export const USER_ALLOWED_FIELDS: (keyof User)[] = [
  "id",
  "email",
  "name",
  "role",
  "createdAt",
  "updatedAt",
  "balance",
  "currency",
  "newUser",
  "incomesCount",
  "expensesCount",
  "provider",
  "emailVerified",
  "isVerified",
  "image",
];
