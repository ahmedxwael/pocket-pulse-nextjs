import { getUserService } from "@/modules/user/services/user.service";
import prisma from "@/prisma/index";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.email || !data.password) {
      return Response.json({
        status: 400,
        data: null,
        message: "Email and password are required",
        error: "Email and password are required",
      });
    }

    const response = await getUserService(data.email);

    console.log("response", response);

    if (response.data) {
      return Response.json({
        status: 400,
        data: null,
        message: "User already exists",
        error: "User already exists",
      });
    } // Add this line back to close the if statement

    const newUser = await prisma.user.create({ data });

    return Response.json({
      status: 200,
      data: newUser,
      message: "User created successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error creating user", error);
    return Response.json({
      status: 500,
      data: null,
      message: "Error creating user",
      error: "Error creating user",
    });
  }
}
