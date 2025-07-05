import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { categories } from "./category";
import { expenses } from "./expense";
import { incomes } from "./income";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  image: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  balance: integer().notNull().default(0),
  currency: varchar({ length: 255 }).notNull().default("POUND"),
  newUser: boolean().notNull().default(true),
  incomesCount: integer().notNull().default(0),
  expensesCount: integer().notNull().default(0),
  savingsCount: integer().notNull().default(0),
  goalsCount: integer().notNull().default(0),
  emailVerified: boolean().notNull().default(false),
});

export const userRelations = relations(users, ({ many }) => ({
  incomes: many(incomes),
  expenses: many(expenses),
  categories: many(categories),
}));
