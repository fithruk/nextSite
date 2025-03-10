import ApiService from "@/apiService/apiService";
import { ExerciceFullType } from "@/types/types";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { exerciseName, token } = await req.json();

  const url = process.env.API_URL!;
  const apiExerciseService = new ApiService(url, token);
  try {
    const { data, status } = await apiExerciseService.post<ExerciceFullType>(
      `/exercises/getExerciseByName`,
      { exerciseName, token }
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
