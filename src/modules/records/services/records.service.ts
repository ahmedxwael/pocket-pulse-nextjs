/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from "@/design-system/types";
import { getCurrentUser } from "@/modules/user/actions";
import prisma from "@/prisma/index";
import { GenericObject } from "@/shared/types";
import { Record } from "../types";

export async function getRecordsService(params: Params = {}) {
  const user = await getCurrentUser();

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
  const user = await getCurrentUser();

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

export async function createRecordService(
  data: any,
  params: GenericObject = {}
) {
  const record = await prisma.record.create({
    data,
    ...params,
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
  const user = await getCurrentUser();

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
      message: "Couldn't find the record.",
      error: "Couldn't update the record.",
    };
  }

  return {
    data: record as Record,
    message: "Record updated successfully",
    error: null,
  };
}

export async function deleteRecordService(id: string, params: Params = {}) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      data: null,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  }

  const record = await prisma.record.delete({
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
      message: "Couldn't find the record.",
      error: "Couldn't delete the record.",
    };
  }

  return {
    data: record as Record,
    message: "Record deleted successfully",
    error: null,
  };
}
