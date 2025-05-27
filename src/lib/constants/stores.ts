// Store configuration with validation patterns
export const STORE_CONFIG = {
	13: {
		displayName: "Steam",
		urlPattern: "steampowered.com/app/",
		platforms: ["PC (Microsoft Windows)", "Mac", "Linux"],
	},
	14: {
		displayName: "GOG",
		urlPattern: "gog.com/game/",
		platforms: ["PC (Microsoft Windows)"],
	},
	15: {
		displayName: "Itch.io",
		urlPattern: "itch.io/",
		platforms: ["PC (Microsoft Windows)"],
	},
	16: {
		displayName: "Epic Games",
		urlPattern: "epicgames.com/store/",
		platforms: ["PC (Microsoft Windows)"],
	},
	17: {
		displayName: "Google Play",
		urlPattern: "play.google.com/store/",
		platforms: ["Android"],
	},
	18: {
		displayName: "App Store",
		urlPattern: "apps.apple.com/",
		platforms: ["iOS"],
	},
	20: {
		displayName: "PlayStation Store",
		urlPattern: "store.playstation.com/",
		platforms: ["PlayStation 4", "PlayStation 5"],
	},
	21: {
		displayName: "Xbox Store",
		urlPattern: "xbox.com/",
		platforms: ["Xbox One", "Xbox Series X|S"],
	},
	22: {
		displayName: "Nintendo eShop",
		urlPattern: "nintendo.com/games/detail/",
		platforms: ["Nintendo Switch"],
	},
	23: {
		displayName: "PlayStation Store",
		urlPattern: "store.playstation.com/",
		platforms: ["PlayStation 4", "PlayStation 5"],
	},
} as const;

// Map website type names to store categories (for API responses that use type.type instead of category)
export const WEBSITE_TYPE_TO_CATEGORY: Record<string, number> = {
	Steam: 13,
	GOG: 14,
	"Itch.io": 15,
	"Epic Games": 16,
	"Google Play": 17,
	"App Store": 18,
	"PlayStation Store": 20,
	Xbox: 21,
	"Nintendo eShop": 22,
};

// Create platform to store mapping
export const PLATFORM_STORE_MAP = Object.entries(STORE_CONFIG).reduce(
	(map, [categoryStr, config]) => {
		const category = Number(categoryStr);
		for (const platform of config.platforms) {
			map[platform] = { category, displayName: config.displayName };
		}
		return map;
	},
	{} as Record<string, { category: number; displayName: string }>,
);

// Store category type for better type safety
export type StoreCategory = keyof typeof STORE_CONFIG;
