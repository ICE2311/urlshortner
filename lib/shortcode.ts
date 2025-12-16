import prisma from "./db";

// Base62 characters for short code generation (A-Z, a-z, 0-9)
const BASE62_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generates a random base62 string of specified length
 * @param length Length of the generated string (default: 6)
 * @returns Random base62 string
 */
function generateRandomBase62(length: number = 6): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * BASE62_CHARS.length);
    result += BASE62_CHARS[randomIndex];
  }
  return result;
}

/**
 * Generates a unique short code that doesn't exist in the database
 * Implements collision detection with retry logic
 * @param length Initial length of short code (default: 6, max attempts before incrementing: 5)
 * @returns Unique short code
 */
export async function generateUniqueShortCode(
  length: number = 6
): Promise<string> {
  const MAX_RETRIES = 5;
  const MAX_LENGTH = 8;

  let currentLength = length;

  while (currentLength <= MAX_LENGTH) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const shortCode = generateRandomBase62(currentLength);

      // Check if this code already exists in the database
      const existing = await prisma.link.findUnique({
        where: { shortCode },
      });

      if (!existing) {
        return shortCode;
      }
    }

    // If we've failed MAX_RETRIES times, increase length
    currentLength++;
  }

  // Fallback: generate a timestamp-based code if all else fails
  const timestamp = Date.now().toString(36);
  const random = generateRandomBase62(3);
  return `${timestamp}${random}`;
}
