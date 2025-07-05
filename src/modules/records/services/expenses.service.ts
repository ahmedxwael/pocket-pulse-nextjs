import { authorized } from "@/modules/account/utils";
import prisma from "@/prisma/config";
import { asyncHandler } from "@/shared/utils";
import {
  Expense,
  ExpenseResponse,
  ExpensesListResponse,
  ExpensesParams,
  ExpensesPostParams,
  ExpensesPutParams,
} from "../types";

/**
 * Retrieve records
 */
export const getExpensesService: (
  params?: ExpensesParams
) => Promise<ExpensesListResponse> = await asyncHandler(
  async (params = {} as ExpensesParams) => {
    const { user } = await authorized();

    const records = await prisma.expense.findMany({
      ...params,

      where: {
        ...params.where,

        userId: user.id,
      },
    });

    return {
      data: records as Expense[],
      message: "Records found successfully",
      error: null,
    };
  }
);

/**
 * Create a new record
 */
export const createExpenseService: (
  params?: ExpensesPostParams
) => Promise<ExpenseResponse> = await asyncHandler(
  async (params = { data: {} } as ExpensesPostParams) => {
    const { data, ...rest } = params;
    const { user } = await authorized();

    const [record] = await prisma.$transaction([
      prisma.expense.create({
        ...rest,
        data: {
          amount: data.amount,
          categoryId: data.categoryId,
          description: data.description,
          userId: user.id,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {},
      }),
    ]);

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
  data: Pick<Expense, "description" | "amount" | "categoryId">,
  params?: ExpensesPutParams
) => Promise<ExpenseResponse> = await asyncHandler(
  async (
    id: string,
    data: Pick<Expense, "description" | "amount" | "categoryId">,
    params = {} as ExpensesPutParams
  ) => {
    const { user } = await authorized();

    const [record] = await prisma.$transaction([
      prisma.expense.update({
        ...params,
        where: {
          ...(params?.where || {}),
          id,
          userId: user.id,
        },
        data,
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {},
      }),
    ]);

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

    const record = await prisma.expense.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!record) {
      throw new Error("Record not found or not authorized");
    }

    const [deletedRecord] = await prisma.$transaction([
      prisma.expense.delete({
        where: {
          id,
          userId: user.id,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {},
      }),
    ]);

    // await cookies().set(USER_SESSION_KEY, updatedUser);

    return {
      data: deletedRecord,
      message: "Record deleted successfully",
      error: null,
    };
  });
