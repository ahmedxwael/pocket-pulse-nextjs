"use server";

import { Params } from "@/design-system/types";
import { getCategoriesService } from "../services";

export async function getCategoriesAction(params: Params = {}) {
  return await getCategoriesService(params);
}
