import { db } from "@/drizzle";
import { expenses, users } from "@/drizzle/schema";
import { authorized } from "@/modules/account/utils";
import { asyncHandler } from "@/shared/utils";
import { and, eq, sql } from "drizzle-orm";
import {
  Expense,
  ExpenseData,
  ExpenseResponse,
  ExpensesListResponse,
} from "../types";

/**
 * Retrieve records
 */
export const getExpensesService: () => Promise<ExpensesListResponse> =
  await asyncHandler(async () => {
    const { user } = await authorized();

    const records = await db.query.expenses.findMany({
      where: eq(expenses.userId, parseInt(user.id)),

      with: {
        category: true,
        goal: true,
      },
    });

    return {
      data: records as unknown as Expense[],
      message: "Records found successfully",
      error: null,
    };
  });

/**
 * Create a new record
 */
export const createExpenseService: (
  data: ExpenseData
) => Promise<ExpenseResponse> = await asyncHandler(
  async (data: ExpenseData) => {
    const { user } = await authorized();

    const record = await db
      .insert(expenses)
      .values({
        amount: data.amount,
        categoryId: data.categoryId,
        note: data.note,
        title: data.title,
        goalId: data.goalId,
        userId: parseInt(user.id),
      })
      .returning();

    // await cookies().set(USER_SESSION_KEY, updatedUser);

    return {
      data: record,
      message: "Record created successfully",
      error: null,
    };
  }
);

/**
 * Update a record
 */
export const updateExpenseService: (
  id: string,
  data: ExpenseData
) => Promise<ExpenseResponse> = await asyncHandler(
  async (id: string, data: ExpenseData) => {
    const { user } = await authorized();

    const record = await db
      .update(expenses)
      .set({
        ...data,
        userId: parseInt(user.id),
      })
      .where(
        and(
          eq(expenses.id, parseInt(id)),
          eq(expenses.userId, parseInt(user.id))
        )
      )
      .returning();

    if (!record) {
      throw new Error("Record not updated");
    }

    // await cookies().set(USER_SESSION_KEY, updatedUser);

    return {
      data: record,
      message: "Record updated successfully",
      error: null,
    };
  }
);

/**
 * Delete a record
 */
export const deleteExpenseService: (id: string) => Promise<ExpenseResponse> =
  await asyncHandler(async (id: string) => {
    const { user } = await authorized();

    const record = await db.query.expenses.findFirst({
      where: and(
        eq(expenses.id, parseInt(id)),
        eq(expenses.userId, parseInt(user.id))
      ),
    });

    if (!record) {
      throw new Error("Record not found or not authorized");
    }

    const deletedRecord = await db
      .delete(expenses)
      .where(
        and(
          eq(expenses.id, parseInt(id)),
          eq(expenses.userId, parseInt(user.id))
        )
      );

    if (!deletedRecord) {
      throw new Error("Record not deleted");
    }

    await db
      .update(users)
      .set({
        expensesCount: sql`${users.expensesCount} - 1`,
      })
      .where(eq(users.id, parseInt(user.id)));

    return {
      data: deletedRecord,
      message: "Record deleted successfully",
      error: null,
    };
  });
