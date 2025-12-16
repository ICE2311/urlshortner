import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Testing Prisma connection...");
    await prisma.$connect();
    console.log("✓ Connected to database");

    const count = await prisma.link.count();
    console.log(`✓ Link count: ${count}`);

    console.log("Creating test link...");
    const link = await prisma.link.create({
      data: {
        shortCode: "test123",
        originalUrl: "https://example.com",
      },
    });
    console.log("✓ Created link:", link);

    // Clean up
    await prisma.link.delete({ where: { id: link.id } });
    console.log("✓ Cleaned up test link");
  } catch (error) {
    console.error("✗ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
