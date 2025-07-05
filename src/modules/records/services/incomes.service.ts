import { db } from "@/drizzle/db";
import { incomes, users } from "@/drizzle/schema";
import { authorized } from "@/modules/account/utils";
import { asyncHandler } from "@/shared/utils";
import { and, eq, sql } from "drizzle-orm";
import {
  Income,
  IncomeData,
  IncomeResponse,
  IncomesListResponse,
} from "../types";

/**
 * Retrieve records
 */
export const getIncomesService: () => Promise<IncomesListResponse> =
  await asyncHandler(async () => {
    const { user } = await authorized();

    const records = await db.query.incomes.findMany({
      where: eq(incomes.userId, parseInt(user.id)),

      with: {
        category: true,
        goal: true,
      },
    });

    return {
      data: records as unknown as Income[],
      message: "Records found successfully",
      error: null,
    };
  });

/**
 * Create a new record
 */
export const createIncomeService: (
  data: IncomeData
) => Promise<IncomeResponse> = await asyncHandler(async (data: IncomeData) => {
  const { user } = await authorized();

  const record = await db
    .insert(incomes)
    .values({
      amount: data.amount,
      title: data.title,
      note: data.note,
      categoryId: data.categoryId,
      goalId: data.goalId,
      userId: parseInt(user.id),
    })
    .returning();

  if (!record) {
    throw new Error("Record not created");
  }

  await db
    .update(users)
    .set({
      incomesCount: sql`${users.incomesCount} + 1`,
    })
    .where(eq(users.id, parseInt(user.id)));

  // await cookies().set(USER_SESSION_KEY, updatedUser);

  return {
    data: record,
    message: "Record created successfully",
    error: null,
  };
});

/**
 * Update a record
 */
export const updateIncomeService: (
  id: string,
  data: IncomeData
) => Promise<IncomeResponse> = await asyncHandler(
  async (id: string, data: IncomeData) => {
    const { user } = await authorized();

    const record = await db
      .update(incomes)
      .set({
        ...data,
        userId: parseInt(user.id),
      })
      .where(
        and(eq(incomes.id, parseInt(id)), eq(incomes.userId, parseInt(user.id)))
      )
      .returning();

    if (!record) {
      throw new Error("Record not updated");
    }

    await db
      .update(users)
      .set({
        incomesCount: sql`${users.incomesCount} + 1`,
      })
      .where(eq(users.id, parseInt(user.id)));

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
export const deleteIncomeService: (id: number) => Promise<IncomeResponse> =
  await asyncHandler(async (id: number) => {
    const { user } = await authorized();

    const record = await db.query.incomes.findFirst({
      where: and(eq(incomes.id, id), eq(incomes.userId, parseInt(user.id))),
      with: {
        category: true,
        goal: true,
      },
    });

    if (!record) {
      throw new Error("Record not found or not authorized");
    }

    const deletedRecord = await db
      .delete(incomes)
      .where(and(eq(incomes.id, id), eq(incomes.userId, parseInt(user.id))));

    if (!deletedRecord) {
      throw new Error("Record not deleted");
    }

    await db
      .update(users)
      .set({
        incomesCount: sql`${users.incomesCount} - 1`,
      })
      .where(eq(users.id, parseInt(user.id)));

    // await cookies().set(USER_SESSION_KEY, updatedUser);

    return {
      data: deletedRecord,
      message: "Record deleted successfully",
      error: null,
    };
  });
