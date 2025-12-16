import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    const count = await prisma.link.count();

    return NextResponse.json({
      status: "ok",
      database: "connected",
      linkCount: count,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
