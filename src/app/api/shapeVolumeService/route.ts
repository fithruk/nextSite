import { NextResponse } from "next/server";
import ApiService from "@/apiService/apiService";

type ResponceType = {
  email: string;
  date: Date;
  shapeRingsValues: [
    {
      weight: number;
      waist: number;
      leftHip: number;
      rightHip: number;
      chest: number;
      neck: number;
      leftBiceps: number;
      rightBiceps: number;
      leftCalve: number;
      rightCalve: number;
    }
  ];
};

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const url = process.env.API_URL!;
  const apiShapeService = new ApiService(url, token);
  try {
    const { data, status } = await apiShapeService.get<ResponceType>(
      `/bodyShape/getCurrentBodyShapeValuesByEmail/${email}`
    );
    console.log(status);
    console.log(data);
  } catch (error) {}

  return NextResponse.json({ success: true });
}
