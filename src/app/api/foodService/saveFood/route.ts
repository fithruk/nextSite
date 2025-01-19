import { SaveFoodRespType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, token, foodPlan }: SaveFoodRespType = body;
  // Дописать...S
}
