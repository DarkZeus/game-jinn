import {
	calculateAchievementStats,
	processAchievements,
} from "@/lib/utils/achievements";
import { AchievementCard } from "./game-achievement-card";
import { AchievementStats } from "./game-achievements-stats";

type GameAchievementsProps = {
	gameTitle: string;
};

const SteamFooter = () => (
	<div className="text-center text-xs text-muted-foreground pt-4 border-t border-muted/20">
		<p>Global achievement stats are updated daily.</p>
		<p>Achievement data is provided by Steam Web API.</p>
	</div>
);

/**
 * GameAchievements component displays authentic Steam-style achievements
 * with unlock times, global percentages, and rarity-based visual styling.
 */
export const GameAchievements = ({ gameTitle }: GameAchievementsProps) => {
	const achievements = processAchievements();
	const stats = calculateAchievementStats(achievements);

	return (
		<div className="space-y-6">
			<AchievementStats {...stats} />

			{/* Steam-Style Achievement List */}
			<div className="space-y-3">
				{achievements.map((achievement) => (
					<AchievementCard
						key={achievement.apiname}
						achievement={achievement}
					/>
				))}
			</div>

			<SteamFooter />
		</div>
	);
};
