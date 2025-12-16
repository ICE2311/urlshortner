import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import type { ApiError } from "@/types";

/**
 * DELETE /api/links/:id
 * Deletes a link by ID
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params for Next.js 15+ compatibility
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json<ApiError>(
        { error: "Invalid request", details: "Link ID is required" },
        { status: 400 }
      );
    }

    // Check if link exists
    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link) {
      return NextResponse.json<ApiError>(
        { error: "Not found", details: "Link not found" },
        { status: 404 }
      );
    }

    // Delete the link
    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json<ApiError>(
      { error: "Internal server error", details: "Failed to delete link" },
      { status: 500 }
    );
  }
}
