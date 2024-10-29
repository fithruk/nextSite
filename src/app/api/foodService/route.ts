import ApiService from "@/apiService/apiService";
import { NextRequest, NextResponse } from "next/server";

export type FoodType = {
  title: string;
  paragraphs: string[];
  tableData: {
    calories: string;
    proteins: string;
    carbs: string;
    fats: string;
    fiber: string | null;
  };
  imgUrls: string[];
  category: string;
  path: string;
};

export type FoodTypeResponce = [FoodType];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  const url = process.env.API_URL!;
  const apiFoodService = new ApiService(url, token);

  try {
    const response = await apiFoodService.get<FoodTypeResponce>(
      "/foods/getAllFood"
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return NextResponse.json(
      { error: "Не удалось получить данные" },
      { status: 500 }
    );
  }
}
