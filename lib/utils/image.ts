/**
 * Normalizes image URLs to ensure direct image streaming.
 * - Converts Google Drive share links to the thumbnail endpoint.
 * - Fixes CMS-generated relative paths (e.g. "public/uploads/...") to absolute paths.
 * - Ensures all relative paths have a leading slash.
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  const trimmed = url.trim();

  // Handle Google Drive viewer links (e.g. drive.google.com/file/d/ID/view...)
  if (trimmed.includes("drive.google.com")) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w2000`;
    }
  }

  // Already an absolute URL — return as-is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // CMS saves uploads as "public/uploads/..." — strip the "public" prefix
  if (trimmed.startsWith("public/")) {
    return "/" + trimmed.slice("public/".length);
  }

  // Ensure relative paths start with a leading slash
  if (!trimmed.startsWith("/")) {
    return "/" + trimmed;
  }

  return trimmed;
}

/**
 * Checks if a URL should skip Next.js image optimisation.
 * External image hosts that serve already-compressed images or require pass-through.
 */
export function isExternalUnoptimizedUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return (
    url.includes("drive.google.com") ||
    url.includes("googleusercontent.com")
  );
}

