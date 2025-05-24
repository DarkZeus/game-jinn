/**
 * IGDB image size options for different use cases
 */
export type IGDBImageSize =
	| "t_thumb" // ~90x128px - for thumbnails/placeholders
	| "t_cover_small" // ~264x374px - for small covers
	| "t_cover_big" // ~512x512px - for medium covers
	| "t_720p" // ~1280x720px - for high resolution
	| "t_1080p"; // ~1920x1080px - for full resolution

/**
 * Generates optimized IGDB image URL with specified size
 */
export const getIGDBImageUrl = (
	imageId: string,
	size: IGDBImageSize = "t_1080p",
	format: "webp" | "jpg" = "webp",
): string => {
	return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.${format}`;
};

/**
 * Generates both thumbnail and full resolution URLs for progressive loading
 */
export const getProgressiveImageUrls = (imageId: string) => {
	return {
		thumb: getIGDBImageUrl(imageId, "t_thumb", "webp"),
		full: getIGDBImageUrl(imageId, "t_cover_big", "webp"),
		// Fallback for older browsers that don't support WebP
		thumbFallback: getIGDBImageUrl(imageId, "t_thumb", "jpg"),
		fullFallback: getIGDBImageUrl(imageId, "t_cover_big", "jpg"),
	};
};

/**
 * Handles legacy IGDB URL format and converts to optimized format
 */
export const normalizeIGDBUrl = (url: string): string => {
	// Handle protocol-relative URLs
	if (url.startsWith("//")) {
		return `https:${url}`;
	}
	return url;
};

/**
 * Gets responsive image URLs based on screen size
 */
export const getResponsiveImageUrls = (imageId: string) => {
	return {
		mobile: getIGDBImageUrl(imageId, "t_cover_small", "webp"),
		tablet: getIGDBImageUrl(imageId, "t_cover_big", "webp"),
		desktop: getIGDBImageUrl(imageId, "t_1080p", "webp"),
	};
};
