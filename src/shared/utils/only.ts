export function only<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>
  );
}
