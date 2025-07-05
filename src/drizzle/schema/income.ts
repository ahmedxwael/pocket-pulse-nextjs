import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { categories } from "./category";
import { goals } from "./goal";
import { users } from "./user";

export const incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  userId: integer().notNull(),
  amount: integer().notNull(),
  title: varchar({ length: 255 }).notNull().default(""),
  note: varchar({ length: 255 }).notNull().default(""),
  categoryId: integer(),
  goalId: integer(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const incomeRelations = relations(incomes, ({ one }) => ({
  user: one(users, {
    fields: [incomes.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [incomes.categoryId],
    references: [categories.id],
  }),
  goal: one(goals, {
    fields: [incomes.goalId],
    references: [goals.id],
  }),
}));
