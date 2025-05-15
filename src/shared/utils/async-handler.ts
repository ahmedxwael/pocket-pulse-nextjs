export async function asyncHandler(handler: any) {
  return async (...T: any) => {
    try {
      return await handler(...T);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
