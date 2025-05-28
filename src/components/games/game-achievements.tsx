import {
	calculateAchievementStats,
	processAchievements,
} from "@/lib/utils/achievements";
import { motion } from "motion/react";
import { AchievementCard } from "./game-achievement-card";
import { AchievementStats } from "./game-achievements-stats";

type GameAchievementsProps = {
	gameTitle: string;
};

const SteamFooter = () => (
	<motion.div
		className="text-center text-xs text-muted-foreground pt-4 border-t border-muted/20"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{
			type: "spring",
			stiffness: 300,
			damping: 30,
			delay: 0.5, // Appears after achievements
		}}
	>
		<p>Global achievement stats are updated daily.</p>
		<p>Achievement data is provided by Steam Web API.</p>
	</motion.div>
);

/**
 * GameAchievements component displays authentic Steam-style achievements
 * with unlock times, global percentages, and rarity-based visual styling.
 */
export const GameAchievements = ({ gameTitle }: GameAchievementsProps) => {
	const achievements = processAchievements();
	const stats = calculateAchievementStats(achievements);

	// Container animation variants for staggered children
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	return (
		<div className="space-y-6">
			<AchievementStats {...stats} />

			{/* Steam-Style Achievement List */}
			<motion.div
				className="space-y-3"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{achievements.map((achievement, index) => (
					<AchievementCard
						key={achievement.apiname}
						achievement={achievement}
						index={index}
					/>
				))}
			</motion.div>

			<SteamFooter />
		</div>
	);
};
