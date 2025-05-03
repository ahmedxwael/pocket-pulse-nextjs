/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse, stringify } from "../json";

export class LocalStorage {
  public constructor() {}

  public get(key: string) {
    const item = localStorage?.getItem(key);

    return parse(item);
  }

  public set(key: string, value: any) {
    const valueString = stringify(value);
    localStorage?.setItem(key, valueString);
  }

  public remove(key: string) {
    localStorage?.removeItem(key);
  }
}

export const localStrg = new LocalStorage();
