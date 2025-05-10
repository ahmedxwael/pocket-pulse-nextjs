"use server";

import {
  createRecordService,
  deleteRecordService,
  getRecordService,
  getRecordsService,
  updateRecordService,
} from "../services";
import {
  RecordGeneralParams,
  RecordListResponse,
  RecordPostParams,
  RecordPutParams,
  RecordResponse,
} from "../types";

export async function getRecordsAction(
  params?: RecordGeneralParams
): Promise<RecordListResponse> {
  return await getRecordsService(params);
}

export async function getRecordAction(
  id: string,
  params?: RecordGeneralParams
): Promise<RecordResponse> {
  return await getRecordService(id, params);
}

export async function createRecordAction(
  data: any,
  params?: RecordPostParams
): Promise<RecordResponse> {
  return await createRecordService(data, params);
}

export async function updateRecordAction(
  id: string,
  params?: RecordPutParams
): Promise<RecordResponse> {
  return await updateRecordService(id, params);
}

export async function deleteRecordAction(
  id: string,
  params?: RecordGeneralParams
): Promise<RecordResponse> {
  return await deleteRecordService(id, params);
}
