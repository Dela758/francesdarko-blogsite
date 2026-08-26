/**
 * Formats an ISO or date string into a human-readable format.
 * Example: "2026-08-07" -> "August 7, 2026"
 */
export function formatDate(dateString: string, locale = "en-US"): string {
  if (!dateString) return "";
  
  const parsed = new Date(dateString);
  if (isNaN(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
