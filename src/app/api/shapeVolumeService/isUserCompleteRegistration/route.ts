import { NextResponse } from "next/server";
import { UserService } from "@/apiService/userServise";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const url = process.env.API_URL!;

  const userService = new UserService(
    url,
    "/auth/isRegistrationComplited",
    token
  );

  try {
    const isUserCompliteRegistration =
      await userService.isUserCompliteRegistration(email);

    return NextResponse.json({ isUserCompliteRegistration }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
