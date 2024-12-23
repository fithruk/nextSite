import { NextResponse } from "next/server";
import ApiService from "@/apiService/apiService";

type FinishRegistrationFormPostTypes = {
  postData: [string, FormDataEntryValue][];
  email?: string;
  token?: string;
};

export async function POST(request: Request) {
  const { postData, email, token }: FinishRegistrationFormPostTypes =
    (await request.json()) as FinishRegistrationFormPostTypes;

  const url = process.env.API_URL!;
  const apiShapeService = new ApiService(url, token);

  try {
    const { status } = await apiShapeService.post("/auth/finishRegistration", {
      postData,
      email,
      token,
    });
    console.log(status + " status in finishRegistration");

    if (status === 200) {
      return NextResponse.json({ status });
    }
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
