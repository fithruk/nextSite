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

    if (isUserCompliteRegistration) {
      const userService_2 = new UserService(
        url,
        `/users/getUserByEmail/${email}`,
        token
      );
      const responce = await userService_2.getUserAgeAndGenderByEmail(email);

      if (responce) {
        return NextResponse.json(
          {
            isUserCompliteRegistration,
            gender: responce.gender,
            dateOfBirdth: responce.dateOfBirdth,
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json({ status: 204 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
