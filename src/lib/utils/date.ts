/**
 * Formats a Unix timestamp to a readable release date format
 * @param timestamp Unix timestamp in seconds
 * @param locale Locale for formatting (defaults to "en-US")
 * @returns Formatted date string (e.g., "Mar 15, 2024")
 */
export const formatReleaseDate = (
	timestamp: number,
	locale = "en-US",
): string => {
	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(timestamp * 1000));
};
