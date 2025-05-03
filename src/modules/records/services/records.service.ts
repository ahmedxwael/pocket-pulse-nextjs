/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from "@/design-system/types";
import { getUser } from "@/modules/user/actions";
import prisma from "@/prisma/index";
import { Record } from "../types";

export async function getRecordsService(params: Params = {}) {
  const user = await getUser();

  if (!user) {
    return {
      data: null,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  }

  const records = await prisma.record.findMany({
    ...params,
    where: {
      ...params.where,
      userId: user.id,
    },
  });

  if (!records) {
    return {
      data: null,
      message: "No records found",
      error: null,
    };
  }

  return {
    data: (records || []) as Record[],
    message: "Records found successfully",
    error: null,
  };
}

export async function getRecordService(id: string, params: Params = {}) {
  const user = await getUser();

  if (!user) {
    return {
      data: null,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  }

  const record = await prisma.record.findUnique({
    where: {
      id,
      userId: user.id,
      ...params.where,
    },
    ...params,
  });

  if (!record) {
    return {
      data: null,
      message: "No record found",
      error: null,
    };
  }

  return {
    data: record as Record,
    message: "Record found successfully",
    error: null,
  };
}

export async function createRecordService(data: any) {
  const record = await prisma.record.create({
    data,
  });

  if (!record) {
    return {
      data: null,
      message: "No record created",
      error: null,
    };
  }

  return {
    data: record as Record,
    message: "Record created successfully",
    error: null,
  };
}

export async function updateRecordService(
  id: string,
  data: any,
  params: Params = {}
) {
  const user = await getUser();

  if (!user) {
    return {
      data: null,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  }

  const record = await prisma.record.update({
    where: {
      id,
      userId: user.id,
      ...params.where,
    },
    data,
    ...params,
  });

  if (!record) {
    return {
      data: null,
      message: "No record updated",
      error: null,
    };
  }

  return {
    data: record as Record,
    message: "Record updated successfully",
    error: null,
  };
}
