/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Params } from "@/design-system/types";
import { GenericObject } from "@/shared/types";
import {
  createRecordService,
  deleteRecordService,
  getRecordService,
  getRecordsService,
  updateRecordService,
} from "../services";

export async function getRecordsAction(params: Params = {}) {
  return await getRecordsService(params);
}

export async function getRecordAction(id: string, params: Params = {}) {
  return await getRecordService(id, params);
}

export async function createRecordAction(
  data: any,
  params: GenericObject = {}
) {
  return await createRecordService(data, params);
}

export async function updateRecordAction(id: string, params: Params = {}) {
  return await updateRecordService(id, params);
}

export async function deleteRecordAction(id: string, params: Params = {}) {
  return await deleteRecordService(id, params);
}
