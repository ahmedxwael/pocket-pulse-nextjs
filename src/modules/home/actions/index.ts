"use server";

import { getOverviewRecords } from "../services";

export async function getOverviewAction() {
  return await getOverviewRecords();
}
