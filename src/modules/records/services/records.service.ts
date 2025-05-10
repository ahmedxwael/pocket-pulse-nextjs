import { getCurrentUser } from "@/modules/user/actions";
import prisma from "@/prisma/index";
import { asyncHandler } from "@/shared/utils";
import {
  Record,
  RecordGeneralParams,
  RecordPostParams,
  RecordPutParams,
} from "../types";

async function authorized() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return {
    data: user,
    message: "Authorized",
    error: null,
  };
}

export const getRecordsService = await asyncHandler(
  async (params: RecordGeneralParams) => {
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
  async (id: string, params: RecordGeneralParams) => {
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
  async (data: any, params: RecordPostParams) => {
    const { data: user } = await authorized();

    const record = await prisma.record.create({
      ...params,
      data: {
        ...data,
        userId: user.id,
      },
    });

    return {
      data: record as Record,
      message: "Record created successfully",
      error: null,
    };
  }
);

export const updateRecordService = await asyncHandler(
  async (id: string, data: any, params: RecordPutParams) => {
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
  async (id: string, params: RecordGeneralParams) => {
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
