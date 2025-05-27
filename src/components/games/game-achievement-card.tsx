import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { SteamAchievement } from "@/lib/utils/achievements";
import { formatUnlockDate } from "@/lib/utils/achievements";
import { CheckCircle, Circle, Lock } from "lucide-react";

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
};

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
	const rarityConfig = getRarityConfig(achievement.rarity);
	const unlockDate = formatUnlockDate(achievement.unlocktime);
	const isUnlocked = achievement.achieved === 1;

	return (
		<Card
			className={`p-4 transition-all duration-300 hover:shadow-lg ${
				isUnlocked
					? `${rarityConfig.bgColor} ${rarityConfig.borderColor} border hover:scale-[1.02]`
					: "bg-muted/30 border-muted/20 hover:bg-muted/40"
			}`}
		>
			<div className="flex items-center gap-4">
				{/* Achievement Icon */}
				<div className="flex-shrink-0">
					<div
						className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden relative ${
							isUnlocked
								? `bg-gradient-to-br ${rarityConfig.gradient} hover:scale-110 hover:rotate-3`
								: "bg-muted/50 hover:bg-muted/60"
						}`}
					>
						{achievement.iconUrl ? (
							<>
								<img
									src={achievement.iconUrl}
									alt={achievement.name}
									className={`w-full h-full object-cover transition-all duration-300 ${
										isUnlocked ? "" : "grayscale opacity-60"
									}`}
									onError={(e) => {
										// Hide the broken image and show fallback
										e.currentTarget.style.display = "none";
										const fallback = e.currentTarget.nextElementSibling
											?.nextElementSibling as HTMLElement;
										if (fallback) fallback.style.display = "flex";
									}}
								/>
								{!isUnlocked && (
									<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
										<Lock className="h-6 w-6 text-white/80" />
									</div>
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
							<Lock className="h-8 w-8 text-muted-foreground" />
						)}
					</div>
				</div>

				{/* Achievement Info */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<h4
									className={`font-semibold text-base ${
										isUnlocked ? "text-foreground" : "text-muted-foreground"
									}`}
								>
									{achievement.name}
								</h4>
								{achievement.rarity && (
									<Badge
										variant="outline"
										className={`text-xs ${rarityConfig.textColor} ${rarityConfig.borderColor} capitalize`}
									>
										{achievement.rarity}
									</Badge>
								)}
							</div>
							<p
								className={`text-sm mb-2 ${
									isUnlocked
										? "text-muted-foreground"
										: "text-muted-foreground/70"
								}`}
							>
								{achievement.description}
							</p>

							{/* Unlock Date for achieved achievements */}
							{isUnlocked && unlockDate && (
								<p className="text-xs text-muted-foreground">
									Unlocked: {unlockDate}
								</p>
							)}
						</div>

						{/* Right side info */}
						<div className="flex flex-col items-end gap-1">
							{/* Achievement Status */}
							<div className="flex items-center gap-1">
								{isUnlocked ? (
									<CheckCircle className="h-4 w-4 text-green-500" />
								) : (
									<Circle className="h-4 w-4 text-muted-foreground" />
								)}
								<span
									className={`text-xs font-medium ${
										isUnlocked ? "text-green-500" : "text-muted-foreground"
									}`}
								>
									{isUnlocked ? "Unlocked" : "Locked"}
								</span>
							</div>

							{/* Global Percentage */}
							{achievement.globalPercentage && (
								<div className="text-right">
									<p className="text-xs text-muted-foreground">Global</p>
									<p
										className={`text-sm font-bold ${
											isUnlocked
												? rarityConfig.textColor
												: "text-muted-foreground/70"
										}`}
									>
										{achievement.globalPercentage}%
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
