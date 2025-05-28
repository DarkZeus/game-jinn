import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { SteamAchievement } from "@/lib/utils/achievements";
import { formatUnlockDate } from "@/lib/utils/achievements";
import { CheckCircle, Circle, Lock } from "lucide-react";
import { motion } from "motion/react";

type RarityConfig = {
	gradient: string;
	textColor: string;
	bgColor: string;
	borderColor: string;
};

const RARITY_CONFIGS: Record<string, RarityConfig> = {
	common: {
		gradient: "from-gray-500 to-gray-600",
		textColor: "text-gray-300",
		bgColor: "bg-gray-500/10",
		borderColor: "border-gray-500/20",
	},
	rare: {
		gradient: "from-blue-500 to-blue-600",
		textColor: "text-blue-300",
		bgColor: "bg-blue-500/10",
		borderColor: "border-blue-500/20",
	},
	epic: {
		gradient: "from-purple-500 to-purple-600",
		textColor: "text-purple-300",
		bgColor: "bg-purple-500/10",
		borderColor: "border-purple-500/20",
	},
	legendary: {
		gradient: "from-yellow-500 to-orange-500",
		textColor: "text-yellow-300",
		bgColor: "bg-yellow-500/10",
		borderColor: "border-yellow-500/20",
	},
};

const getRarityConfig = (rarity: SteamAchievement["rarity"]): RarityConfig => {
	return RARITY_CONFIGS[rarity || "common"];
};

type AchievementCardProps = {
	achievement: SteamAchievement;
	index?: number;
};

export const AchievementCard = ({
	achievement,
	index = 0,
}: AchievementCardProps) => {
	const rarityConfig = getRarityConfig(achievement.rarity);
	const unlockDate = formatUnlockDate(achievement.unlocktime);
	const isUnlocked = achievement.achieved === 1;

	// Spring animation configurations
	const springConfig = {
		type: "spring" as const,
		stiffness: 300,
		damping: 30,
	};

	const bounceConfig = {
		type: "spring" as const,
		stiffness: 400,
		damping: 25,
		mass: 0.8,
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			whileHover={{
				scale: isUnlocked ? 1.02 : 1.01,
				transition: springConfig,
			}}
			whileTap={{
				scale: 0.98,
				transition: { ...springConfig, stiffness: 500 },
			}}
			transition={{
				...springConfig,
				delay: index * 0.1, // Staggered delay based on index
			}}
		>
			<Card
				className={`p-4 ${
					isUnlocked
						? `${rarityConfig.bgColor} ${rarityConfig.borderColor} border`
						: "bg-muted/30 border-muted/20"
				}`}
			>
				<div className="flex items-center gap-4">
					{/* Achievement Icon */}
					<div className="flex-shrink-0">
						<motion.div
							className={`w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden relative ${
								isUnlocked
									? `bg-gradient-to-br ${rarityConfig.gradient}`
									: "bg-muted/50"
							}`}
							whileHover={
								isUnlocked
									? {
											scale: 1.1,
											rotate: 3,
											transition: bounceConfig,
										}
									: {
											scale: 1.05,
											transition: springConfig,
										}
							}
							whileTap={{
								scale: 0.95,
								transition: { ...springConfig, stiffness: 500 },
							}}
						>
							{achievement.iconUrl ? (
								<>
									<motion.img
										src={achievement.iconUrl}
										alt={achievement.name}
										className={`w-full h-full object-cover ${
											isUnlocked ? "" : "grayscale opacity-60"
										}`}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											...springConfig,
											delay: index * 0.1 + 0.2,
										}}
										onError={(e) => {
											// Hide the broken image and show fallback
											e.currentTarget.style.display = "none";
											const fallback = e.currentTarget.nextElementSibling
												?.nextElementSibling as HTMLElement;
											if (fallback) fallback.style.display = "flex";
										}}
									/>
									{!isUnlocked && (
										<motion.div
											className="absolute inset-0 bg-black/40 flex items-center justify-center"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{
												...springConfig,
												delay: index * 0.1 + 0.3,
											}}
										>
											<motion.div
												initial={{ scale: 0, rotate: -180 }}
												animate={{ scale: 1, rotate: 0 }}
												transition={{
													...bounceConfig,
													delay: index * 0.1 + 0.4,
												}}
											>
												<Lock className="h-6 w-6 text-white/80" />
											</motion.div>
										</motion.div>
									)}
									{/* Fallback icon - hidden by default */}
									<div
										className="absolute inset-0 items-center justify-center"
										style={{ display: "none" }}
									>
										<Lock className="h-8 w-8 text-muted-foreground" />
									</div>
								</>
							) : (
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{
										...bounceConfig,
										delay: index * 0.1 + 0.2,
									}}
								>
									<Lock className="h-8 w-8 text-muted-foreground" />
								</motion.div>
							)}
						</motion.div>
					</div>

					{/* Achievement Info */}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-4">
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-1">
									<motion.h4
										className={`font-semibold text-base ${
											isUnlocked ? "text-foreground" : "text-muted-foreground"
										}`}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											...springConfig,
											delay: index * 0.1 + 0.15,
										}}
									>
										{achievement.name}
									</motion.h4>
									{achievement.rarity && (
										<motion.div
											initial={{ opacity: 0, scale: 0, rotate: -45 }}
											animate={{ opacity: 1, scale: 1, rotate: 0 }}
											transition={{
												...bounceConfig,
												delay: index * 0.1 + 0.25,
											}}
											whileHover={{
												scale: 1.05,
												transition: springConfig,
											}}
										>
											<Badge
												variant="outline"
												className={`text-xs ${rarityConfig.textColor} ${rarityConfig.borderColor} capitalize`}
											>
												{achievement.rarity}
											</Badge>
										</motion.div>
									)}
								</div>
								<motion.p
									className={`text-sm mb-2 ${
										isUnlocked
											? "text-muted-foreground"
											: "text-muted-foreground/70"
									}`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										...springConfig,
										delay: index * 0.1 + 0.2,
									}}
								>
									{achievement.description}
								</motion.p>

								{/* Unlock Date for achieved achievements */}
								{isUnlocked && unlockDate && (
									<motion.p
										className="text-xs text-muted-foreground"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											...springConfig,
											delay: index * 0.1 + 0.35,
										}}
									>
										Unlocked: {unlockDate}
									</motion.p>
								)}
							</div>

							{/* Right side info */}
							<div className="flex flex-col items-end gap-1">
								{/* Achievement Status */}
								<motion.div
									className="flex items-center gap-1"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										...springConfig,
										delay: index * 0.1 + 0.25,
									}}
									whileHover={{
										scale: 1.05,
										transition: springConfig,
									}}
								>
									<motion.div
										initial={{ scale: 0, rotate: -90 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{
											...bounceConfig,
											delay: index * 0.1 + 0.3,
										}}
									>
										{isUnlocked ? (
											<CheckCircle className="h-4 w-4 text-green-500" />
										) : (
											<Circle className="h-4 w-4 text-muted-foreground" />
										)}
									</motion.div>
									<span
										className={`text-xs font-medium ${
											isUnlocked ? "text-green-500" : "text-muted-foreground"
										}`}
									>
										{isUnlocked ? "Unlocked" : "Locked"}
									</span>
								</motion.div>

								{/* Global Percentage */}
								{achievement.globalPercentage && (
									<motion.div
										className="text-right"
										initial={{ opacity: 0, y: 20, scale: 0.8 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										transition={{
											...springConfig,
											delay: index * 0.1 + 0.4,
										}}
										whileHover={{
											scale: 1.05,
											transition: springConfig,
										}}
									>
										<p className="text-xs text-muted-foreground">Global</p>
										<motion.p
											className={`text-sm font-bold ${
												isUnlocked
													? rarityConfig.textColor
													: "text-muted-foreground/70"
											}`}
											whileHover={
												isUnlocked
													? {
															scale: 1.1,
															transition: bounceConfig,
														}
													: undefined
											}
										>
											{achievement.globalPercentage}%
										</motion.p>
									</motion.div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Card>
		</motion.div>
	);
};
