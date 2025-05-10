/* eslint-disable @typescript-eslint/no-explicit-any */
export function isEmpty(value: any) {
  if (!value) return true;

  if (typeof value === "object") return Object.keys(value).length === 0;

  if (Array.isArray(value)) return value.length === 0;
}
