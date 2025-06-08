"use server";

import {
  createRecordService,
  deleteRecordService,
  getRecordService,
  getRecordsService,
  updateRecordService,
} from "../services";

export const getRecordsAction = getRecordsService.bind(null);

export const getRecordAction = getRecordService.bind(null);

export const createRecordAction = createRecordService.bind(null);

export const updateRecordAction = updateRecordService.bind(null);

export const deleteRecordAction = deleteRecordService.bind(null);
