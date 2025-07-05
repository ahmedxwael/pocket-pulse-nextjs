export async function asyncHandler(handler: any) {
  return async (...T: any) => {
    try {
      return await handler(...T);
    } catch (error: any) {
      console.log("error", error);
      throw new Error(error);
    }
  };
}
