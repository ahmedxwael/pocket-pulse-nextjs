import { authorized } from "@/modules/account/utils";
import prisma from "@/prisma/config";
import { asyncHandler } from "@/shared/utils";
import {
  Income,
  IncomeResponse,
  IncomesListResponse,
  IncomesParams,
  IncomesPostParams,
  IncomesPutParams,
} from "../types";

/**
 * Retrieve records
 */
export const getIncomesService: (
  params?: IncomesParams
) => Promise<IncomesListResponse> = await asyncHandler(
  async (params = {} as IncomesParams) => {
    const { user } = await authorized();

    const records = await prisma.income.findMany({
      ...params,

      where: {
        ...params.where,

        userId: user.id,
      },
    });

    return {
      data: records as Income[],
      message: "Records found successfully",
      error: null,
    };
  }
);

/**
 * Create a new record
 */
export const createIncomeService: (
  params?: IncomesPostParams
) => Promise<IncomeResponse> = await asyncHandler(
  async (params = { data: {} } as IncomesPostParams) => {
    const { data, ...rest } = params;
    const { user } = await authorized();

    console.log("data", data);

    const [record] = await prisma.$transaction([
      prisma.income.create({
        ...rest,
        data: {
          amount: data.amount,
          // categoryId: data.categoryId,
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
export const updateIncomeService: (
  id: string,
  data: Pick<Income, "description" | "amount" | "categoryId">,
  params?: IncomesPutParams
) => Promise<IncomeResponse> = await asyncHandler(
  async (
    id: string,
    data: Pick<Income, "description" | "amount" | "categoryId">,
    params = {} as IncomesPutParams
  ) => {
    const { user } = await authorized();

    const [record] = await prisma.$transaction([
      prisma.income.update({
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
export const deleteIncomeService: (id: string) => Promise<IncomeResponse> =
  await asyncHandler(async (id: string) => {
    const { user } = await authorized();

    const record = await prisma.income.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!record) {
      throw new Error("Record not found or not authorized");
    }

    const [deletedRecord] = await prisma.$transaction([
      prisma.income.delete({
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
