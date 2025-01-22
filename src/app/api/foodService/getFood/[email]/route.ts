import ApiService from "@/apiService/apiService";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const url = process.env.API_URL!;
  const apiFoodService = new ApiService(url, token);
  try {
    const { data, status } = await apiFoodService.get(
      `/foods/getUserFoodPlan/${email}`
    );
    if (status === 200) {
      return NextResponse.json(data);
    }
    if (status === 400) {
      return NextResponse.json(data, { status });
    }
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return NextResponse.json(
      { error: "Не удалось получить данные" },
      { status: 500 }
    );
  }
}
