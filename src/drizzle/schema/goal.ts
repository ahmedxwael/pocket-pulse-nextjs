import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { expenses } from "./expense";
import { incomes } from "./income";
import { users } from "./user";

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull().default(""),
  targetAmount: integer().notNull().default(0),
  currentAmount: integer().notNull().default(0),
  isCompleted: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const goalRelations = relations(goals, ({ one, many }) => {
  return {
    user: one(users, {
      fields: [goals.userId],
      references: [users.id],
    }),
    incomes: many(incomes),
    expenses: many(expenses),
  };
});
