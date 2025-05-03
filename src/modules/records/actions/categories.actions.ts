"use server";

import { Params } from "@/design-system/types";
import { getCategoriesService } from "../services";

export async function getCategoriesAction(params: Params = {}) {
  const { data } = await getCategoriesService(params);

  if (data) {
    return data;
  }

  return [];
}
