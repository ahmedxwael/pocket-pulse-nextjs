"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { GenericObject } from "../types";

export function useBaseAction(path: string) {
  return async (data: FormData | GenericObject) => {
    const response = await axios.post(path, data);

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    }

    return {
      data: null,
      status: response.status,
      message: response.statusText,
    };
  };
}

export function useAction(path?: string) {
  const pathname = usePathname();

  return useBaseAction((path ?? pathname) + "/action");
}
