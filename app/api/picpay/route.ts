import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const link = process.env.LINK_PICPAY ?? "";
  return NextResponse.json({ link });
}