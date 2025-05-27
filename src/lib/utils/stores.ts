import type { Website } from "@/lib/api/igdb.types";
import { STORE_CONFIG, WEBSITE_TYPE_TO_CATEGORY } from "@/lib/constants/stores";

// Type guard to check if type is an object with a type string property
const isTypeObject = (type: unknown): type is { type: string } => {
	return (
		typeof type === "object" &&
		type !== null &&
		"type" in type &&
		typeof (type as { type: unknown }).type === "string"
	);
};

/**
 * Extracts the store category from website data (handles both category and type.type formats)
 */
export const getWebsiteCategory = (website: Website): number | null => {
	// Direct category field (preferred)
	if (website.category) {
		return website.category;
	}

	// Type-based category mapping (fallback for Xbox, etc.)
	// Handle API responses where type is an object with nested type string
	if (isTypeObject(website.type)) {
		return WEBSITE_TYPE_TO_CATEGORY[website.type.type] || null;
	}

	return null;
};

/**
 * Validates if a URL matches the expected pattern for a given store category
 */
export const isValidStoreUrl = (category: number, url: string): boolean => {
	const storeConfig = STORE_CONFIG[category as keyof typeof STORE_CONFIG];
	return storeConfig ? url.includes(storeConfig.urlPattern) : false;
};
