export async function asyncHandler(handler: any) {
  return async (...T: any) => {
    try {
      return await handler(T);
    } catch (error: any) {
      return {
        data: null,
        message: "Something went wrong!",
        error: error.message,
      };
    }
  };
}
