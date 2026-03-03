import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = String(body?.data ?? "");
    if (!input) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }
    const chars = Array.from(input.toLowerCase()).sort();
    return NextResponse.json({ word: chars });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const input = url.searchParams.get("data") ?? "";
  if (!input) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }
  const chars = Array.from(input.toLowerCase()).sort();
  return NextResponse.json({ word: chars });
}
