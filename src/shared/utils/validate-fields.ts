export function validateFields(
  fields: Record<string, string | number>,
  requiredFields: string[]
) {
  const errors: Record<string, string>[] = [];

  for (const field of requiredFields) {
    if (!fields[field]) {
      errors.push({
        field,
        message: `${field} is required`,
      });
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
