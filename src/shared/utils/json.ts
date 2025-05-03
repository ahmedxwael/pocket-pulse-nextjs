export function parse(value: string | null) {
  if (!value || typeof value !== "string") return null;

  return JSON.parse(value);
}

export function stringify(value: any) {
  if (!value) return "";

  return JSON.stringify(value);
}
