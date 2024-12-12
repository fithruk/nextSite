import ApiService from "@/apiService/apiService";
import { NextRequest, NextResponse } from "next/server";
import { FoodType } from "../route";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  const id = searchParams.get("id");
  const url = process.env.API_URL!;
  const apiFoodService = new ApiService(url, token);
  try {
    const { data, status } = await apiFoodService.get<FoodType>(
      `/foods/getlFoodById/${id}`
    );
    if (status === 200) {
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return NextResponse.json(
      { error: "Не удалось получить данные" },
      { status: 500 }
    );
  }
}
