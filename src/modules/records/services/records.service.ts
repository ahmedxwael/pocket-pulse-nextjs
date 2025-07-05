import { authorized } from "@/modules/account/utils";
import prisma from "@/prisma/config";
import { cookies } from "@/shared/config";
import { asyncHandler, USER_SESSION_KEY } from "@/shared/utils";
import {
  Record,
  RecordGeneralParams,
  RecordListResponse,
  RecordPostParams,
  RecordPutParams,
  RecordResponse,
  RecordsParams,
} from "../types";

/**
 * Retrieve records
 */
export const getRecordsService: (
  params?: RecordsParams
) => Promise<RecordListResponse> = await asyncHandler(
  async (params = {} as RecordsParams) => {
    const { user } = await authorized();

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

/**
 * Retrieve a single record
 */
export const getRecordService: (
  id: string,
  params?: RecordGeneralParams
) => Promise<RecordResponse> = await asyncHandler(
  async (id: string, params: RecordGeneralParams = {}) => {
    const { user } = await authorized();

    const record = await prisma.record.findUnique({
      ...params,
      where: {
        ...(params?.where || {}),
        id,
        userId: user.id,
      },
    });

    return {
      data: record,
      message: "Record found successfully",
      error: null,
    };
  }
);

/**
 * Create a new record
 */
export const createRecordService: (
  params?: RecordPostParams
) => Promise<RecordResponse> = await asyncHandler(
  async (params = { data: {} } as RecordPostParams) => {
    const { data, ...rest } = params;
    const { user } = await authorized();

    const [record, updatedUser] = await prisma.$transaction([
      prisma.record.create({
        ...rest,
        data: {
          amount: data.amount,
          categoryId: data.categoryId,
          description: data.description,
          type: data.type,
          userId: user.id,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {},
      }),
    ]);

    await cookies().set(USER_SESSION_KEY, updatedUser);

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
export const updateRecordService: (
  id: string,
  data: Pick<Record, "description" | "amount" | "categoryId">,
  params?: RecordPutParams
) => Promise<RecordResponse> = await asyncHandler(
  async (
    id: string,
    data: Pick<Record, "description" | "amount" | "categoryId">,
    params = {} as RecordPutParams
  ) => {
    const { user } = await authorized();

    const [record, updatedUser] = await prisma.$transaction([
      prisma.record.update({
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

    await cookies().set(USER_SESSION_KEY, updatedUser);

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
export const deleteRecordService: (id: string) => Promise<RecordResponse> =
  await asyncHandler(async (id: string) => {
    const { user } = await authorized();

    const record = await prisma.record.findUnique({
      where: {
        id,
        userId: user.id,
      },
      select: {
        type: true,
        amount: true,
      },
    });

    if (!record) {
      throw new Error("Record not found or not authorized");
    }

    const [deletedRecord, updatedUser] = await prisma.$transaction([
      prisma.record.delete({
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

    await cookies().set(USER_SESSION_KEY, updatedUser);

    return {
      data: deletedRecord,
      message: "Record deleted successfully",
      error: null,
    };
  });
