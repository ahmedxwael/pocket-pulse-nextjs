import { getUserService } from "@/modules/user/services/user.service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await getUserService(body.email);

    if (!response.data) {
      return Response.json({
        status: 404,
        ...response,
      });
    }

    return Response.json({
      status: 200,
      ...response,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      data: null,
      message: "Error finding user",
      error: "Error finding user",
    });
  }
}
