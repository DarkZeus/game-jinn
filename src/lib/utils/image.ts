/**
 * IGDB image size options based on official API documentation
 * @see https://api-docs.igdb.com/#images
 */
export type IGDBImageSize =
	| "t_thumb" // 90x90px - for thumbnails
	| "t_micro" // 35x35px - for micro thumbnails
	| "t_cover_small" // 90x128px - for small covers
	| "t_cover_big" // 264x374px - for medium covers
	| "t_screenshot_med" // 569x320px - for medium screenshots
	| "t_screenshot_big" // 889x500px - for large screenshots
	| "t_screenshot_huge" // 1280x720px - for huge screenshots
	| "t_logo_med" // 284x160px - for medium logos
	| "t_720p" // 1280x720px - for 720p resolution
	| "t_1080p"; // 1920x1080px - for 1080p resolution

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
 * Now defaults to higher quality images for modern displays
 */
export const getProgressiveImageUrls = (
	imageId: string,
	fullSize: IGDBImageSize = "t_720p",
) => {
	return {
		thumb: getIGDBImageUrl(imageId, "t_thumb", "webp"),
		full: getIGDBImageUrl(imageId, fullSize, "webp"),
		// Fallback for older browsers that don't support WebP
		thumbFallback: getIGDBImageUrl(imageId, "t_thumb", "jpg"),
		fullFallback: getIGDBImageUrl(imageId, fullSize, "jpg"),
	};
};

/**
 * Detects screen resolution and returns appropriate image size
 */
export const getOptimalImageSize = (): IGDBImageSize => {
	if (typeof window === "undefined") return "t_720p"; // SSR default

	const devicePixelRatio = window.devicePixelRatio || 1;
	const screenWidth = window.screen.width * devicePixelRatio;

	if (screenWidth >= 2560) return "t_1080p"; // 2K+ displays
	if (screenWidth >= 1920) return "t_720p"; // 1080p displays
	if (screenWidth >= 1280) return "t_cover_big"; // Smaller displays
	return "t_cover_small"; // Mobile displays
};

/**
 * Generates responsive progressive image URLs based on screen size
 */
export const getResponsiveProgressiveImageUrls = (imageId: string) => {
	const optimalSize = getOptimalImageSize();
	return getProgressiveImageUrls(imageId, optimalSize);
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
 * Gets responsive image URLs based on screen size and use case
 */
export const getResponsiveImageUrls = (imageId: string) => {
	return {
		mobile: getIGDBImageUrl(imageId, "t_cover_small", "webp"),
		tablet: getIGDBImageUrl(imageId, "t_cover_big", "webp"),
		desktop: getIGDBImageUrl(imageId, "t_720p", "webp"),
		highRes: getIGDBImageUrl(imageId, "t_1080p", "webp"),
	};
};

/**
 * Gets screenshot URLs in different sizes
 */
export const getScreenshotUrls = (imageId: string) => {
	return {
		thumb: getIGDBImageUrl(imageId, "t_thumb", "webp"),
		medium: getIGDBImageUrl(imageId, "t_screenshot_med", "webp"),
		large: getIGDBImageUrl(imageId, "t_screenshot_big", "webp"),
		huge: getIGDBImageUrl(imageId, "t_screenshot_huge", "webp"),
		fullRes: getIGDBImageUrl(imageId, "t_1080p", "webp"),
	};
};

/**
 * Gets logo URLs
 */
export const getLogoUrls = (imageId: string) => {
	return {
		medium: getIGDBImageUrl(imageId, "t_logo_med", "webp"),
		mediumFallback: getIGDBImageUrl(imageId, "t_logo_med", "jpg"),
	};
};
