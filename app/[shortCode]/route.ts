import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 * GET handler for /{shortCode}
 * Redirects to original URL and tracks analytics
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortCode: string }> }
) {
  try {
    // Await params for Next.js 15+ compatibility
    const { shortCode } = await context.params;

    // Find the link by short code
    const link = await prisma.link.findUnique({
      where: { shortCode },
    });

    // If link not found, return 404
    if (!link) {
      return new NextResponse("Short link not found", { status: 404 });
    }

    // Update click count and last clicked timestamp atomically
    // Run this in background, don't wait for it
    prisma.link
      .update({
        where: { shortCode },
        data: {
          clickCount: {
            increment: 1,
          },
          lastClickedAt: new Date(),
        },
      })
      .catch((error) => {
        console.error("Error updating click count:", error);
        // Don't fail the redirect if click tracking fails
      });

    // Perform 302 redirect to original URL
    return NextResponse.redirect(link.originalUrl, { status: 302 });
  } catch (error) {
    console.error("Error in redirect handler:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
