import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.API_KEY;

  const res = await fetch(
    "https://v3.football.api-sports.io/fixtures?live=all",
    {
      headers: {
        "x-apisports-key": API_KEY as string,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data.response || []);
}
