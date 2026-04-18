// src/app/api/bracket/[type]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Import dari lib, bukan definisikan di sini
import { Type } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    const typeFromParams = params?.type;

    if (!typeFromParams) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }
    const matchType = typeFromParams as Type;

    const matches = await db.match.findMany({
      where: {
        type: matchType,
        round: { not: "Group" },
      },
    });

    return NextResponse.json(matches);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

// HAPUS baris export { db } jika ada di bawah sini!