import { SaveFoodRespType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import ApiService from "@/apiService/apiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email = "", token = "", userFoodPlan }: SaveFoodRespType = body;

    const baseUrl = process.env.API_URL!;
    const apiService = new ApiService(baseUrl, token);
    const { status } = await apiService.post("/foods/saveUserFoodPlan", {
      email,
      userFoodPlan,
    });
    console.log(status + " status");

    if (status === 200) {
      return NextResponse.json({ status });
    }
  } catch (error) {}
}
