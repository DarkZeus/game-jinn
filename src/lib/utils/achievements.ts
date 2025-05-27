import { PORTAL_2_ACHIEVEMENTS } from "@/lib/data/portal-achievements";

export type SteamAchievement = {
	apiname: string;
	achieved: 0 | 1;
	unlocktime: number;
	name: string;
	description: string;
	rarity?: "common" | "rare" | "epic" | "legendary";
	globalPercentage?: number;
	iconUrl?: string;
};

type BaseAchievement = {
	apiname: string;
	achieved: 0 | 1;
	unlocktime: number;
	name: string;
	description: string;
};

// Portal 2 Steam App ID
const PORTAL_2_APP_ID = "620";

// Generate Steam achievement icon URL
export const getAchievementIconUrl = (
	appId: string,
	apiName: string,
): string => {
	// Remove 'ACH.' prefix if it exists for Steam CDN compatibility
	const cleanApiName = apiName.startsWith("ACH.")
		? apiName.substring(4)
		: apiName;
	return `https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/${appId}/${cleanApiName}.jpg`;
};

// Rarity calculation based on global percentage
export const calculateRarity = (
	globalPercentage: number,
): SteamAchievement["rarity"] => {
	if (globalPercentage >= 50) return "common";
	if (globalPercentage >= 20) return "rare";
	if (globalPercentage >= 5) return "epic";
	return "legendary";
};

// Generate realistic global percentages based on achievement difficulty
export const generateGlobalPercentage = (
	achievement: BaseAchievement,
): number => {
	if (achievement.achieved === 1) {
		// Unlocked achievements should have higher percentages (40-90%)
		return 40 + Math.random() * 50;
	}

	const description = achievement.description.toLowerCase();
	const name = achievement.name.toLowerCase();

	// Co-op achievements are harder (require friends)
	if (description.includes("co-op") || description.includes("partner")) {
		return 5 + Math.random() * 25;
	}

	// Speed/skill achievements are very rare
	if (
		name.includes("speed") ||
		description.includes("seconds") ||
		description.includes("without")
	) {
		return 1 + Math.random() * 10;
	}

	// Completion achievements (moderate difficulty)
	if (description.includes("all") || description.includes("complete")) {
		return 10 + Math.random() * 30;
	}

	// Regular achievements
	return 15 + Math.random() * 35;
};

// Process raw achievement data into enhanced Steam achievements
export const processAchievements = (): SteamAchievement[] => {
	return PORTAL_2_ACHIEVEMENTS.map((achievement) => {
		const globalPercentage =
			Math.round(generateGlobalPercentage(achievement) * 10) / 10;

		return {
			...achievement,
			globalPercentage,
			rarity: calculateRarity(globalPercentage),
			iconUrl: getAchievementIconUrl(PORTAL_2_APP_ID, achievement.apiname),
		};
	});
};

// Calculate achievement statistics
export const calculateAchievementStats = (achievements: SteamAchievement[]) => {
	const unlockedCount = achievements.filter((a) => a.achieved === 1).length;
	const totalCount = achievements.length;
	const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

	const avgGlobalCompletion =
		unlockedCount > 0
			? achievements
					.filter((a) => a.achieved === 1)
					.reduce(
						(sum, a, _, arr) => sum + (a.globalPercentage || 0) / arr.length,
						0,
					)
			: 0;

	return {
		unlockedCount,
		totalCount,
		completionPercentage,
		avgGlobalCompletion,
	};
};

// Format unlock timestamp to readable date
export const formatUnlockDate = (unlocktime: number): string | null => {
	if (unlocktime === 0) return null;

	return new Date(unlocktime * 1000).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
