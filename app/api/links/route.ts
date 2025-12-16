import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateUniqueShortCode } from "@/lib/shortcode";
import { isValidUrl, normalizeUrl } from "@/lib/validation";
import type { CreateLinkRequest, CreateLinkResponse, ApiError } from "@/types";

/**
 * POST /api/links
 * Creates a new short link
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateLinkRequest = await request.json();
    const { originalUrl } = body;

    // Validate input
    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json<ApiError>(
        { error: "Invalid request", details: "originalUrl is required" },
        { status: 400 }
      );
    }

    // Normalize and validate URL
    const normalizedUrl = normalizeUrl(originalUrl);
    if (!isValidUrl(normalizedUrl)) {
      return NextResponse.json<ApiError>(
        {
          error: "Invalid URL",
          details: "Please provide a valid http or https URL",
        },
        { status: 400 }
      );
    }

    // Generate unique short code
    const shortCode = await generateUniqueShortCode();

    // Create link in database
    const link = await prisma.link.create({
      data: {
        shortCode,
        originalUrl: normalizedUrl,
      },
    });

    // Get base URL from environment or request
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const shortUrl = `${baseUrl}/${shortCode}`;

    const response: CreateLinkResponse = {
      shortUrl,
      shortCode: link.shortCode,
      originalUrl: link.originalUrl,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Error creating link:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return NextResponse.json<ApiError>(
      {
        error: "Internal server error",
        details: error.message || "Failed to create short link",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/links
 * Retrieves all links, ordered by creation date (newest first)
 */
export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json<ApiError>(
      { error: "Internal server error", details: "Failed to fetch links" },
      { status: 500 }
    );
  }
}
