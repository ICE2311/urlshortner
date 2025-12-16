/**
 * Validates if a string is a valid URL with proper protocol and format
 * Blocks malicious schemes like javascript:, data:, file:
 * @param url URL string to validate
 * @returns true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Only allow http and https protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    // Must have a valid hostname
    if (!parsed.hostname || parsed.hostname.length === 0) {
      return false;
    }

    // Block localhost and internal IPs in production
    if (process.env.NODE_ENV === "production") {
      const hostname = parsed.hostname.toLowerCase();
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "0.0.0.0" ||
        hostname.startsWith("192.168.") ||
        hostname.startsWith("10.") ||
        hostname.startsWith("172.")
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Normalizes a URL by ensuring it has a protocol
 * @param url URL string to normalize
 * @returns Normalized URL with protocol
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();

  // If no protocol, assume https
  if (!trimmed.match(/^https?:\/\//i)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}
