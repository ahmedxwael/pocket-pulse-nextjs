import { authorized } from "@/modules/account/utils";
import prisma from "@/prisma/index";
import { cookies } from "@/shared/config";
import { asyncHandler, USER_SESSION_KEY } from "@/shared/utils";
import {
  Record,
  RecordGeneralParams,
  RecordPostParams,
  RecordPutParams,
  RecordsParams,
} from "../types";

export const getRecordsService = await asyncHandler(
  async (params = {} as RecordsParams) => {
    const { data: user } = await authorized();

    const records = await prisma.record.findMany({
      ...params,

      where: {
        ...params.where,

        userId: user.id,
      },
    });

    return {
      data: records as Record[],
      message: "Records found successfully",
      error: null,
    };
  }
);

export const getRecordService = await asyncHandler(
  async (
    id: string,
    params: RecordGeneralParams = {} as RecordGeneralParams
  ) => {
    const { data: user } = await authorized();

    const record = await prisma.record.findUnique({
      ...params,
      where: {
        ...(params?.where || {}),
        id,
        userId: user.id,
      },
    });

    if (!record) {
      return {
        data: null,
        message: "Record not found",
        error: null,
      };
    }

    return {
      data: record as Record,
      message: "Record found successfully",
      error: null,
    };
  }
);

export const createRecordService = await asyncHandler(
  async (params: RecordPostParams = {} as RecordPostParams) => {
    const { data, ...rest } = params;
    const { data: user } = await authorized();

    const record = await prisma.record.create({
      ...rest,
      data: {
        amount: data.amount,
        categoryId: data.categoryId,
        description: data.description,
        type: data.type,
        userId: user.id,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        expensesCount:
          data.type === "EXPENSE" || data.type === "TRANSFER" ? data.amount : 0,
        incomesCount:
          data.type === "INCOME" || data.type === "TRANSFER" ? data.amount : 0,
        balance:
          data.type === "INCOME"
            ? user.balance + data.amount
            : data.type === "EXPENSE" || data.type === "TRANSFER"
              ? user.balance - data.amount
              : user.balance,
      },
    });

    await cookies().set(USER_SESSION_KEY, updatedUser);

    return {
      data: record as Record,
      message: "Record created successfully",
      error: null,
    };
  }
);

export const updateRecordService = await asyncHandler(
  async (
    id: string,
    data: any,
    params: RecordPutParams = {} as RecordPutParams
  ) => {
    const { data: user } = await authorized();

    const record = await prisma.record.update({
      ...params,
      where: {
        ...(params?.where || {}),
        id,
        userId: user.id,
      },
      data,
    });

    return {
      data: record as Record,
      message: "Record updated successfully",
      error: null,
    };
  }
);

export const deleteRecordService = await asyncHandler(
  async (
    id: string,
    params: RecordGeneralParams = {} as RecordGeneralParams
  ) => {
    const { data: user } = await authorized();

    const record = await prisma.record.delete({
      ...params,
      where: {
        ...(params?.where || {}),
        id,
        userId: user.id,
      },
    });

    return {
      data: record as Record,
      message: "Record deleted successfully",
      error: null,
    };
  }
);
