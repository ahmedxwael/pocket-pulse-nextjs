import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { expenses } from "./expense";
import { incomes } from "./income";
import { users } from "./user";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  userId: integer().notNull(),
  name: varchar({ length: 255 }).notNull().default(""),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const categoryRelations = relations(categories, ({ many, one }) => ({
  incomes: many(incomes),
  expenses: many(expenses),
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
}));
