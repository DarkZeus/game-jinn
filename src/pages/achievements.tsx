import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

// Mock data for achievements
const achievements = [
	{
		id: 1,
		title: "First Victory",
		description: "Complete your first game",
		icon: Trophy,
		progress: 100,
		unlocked: true,
		unlockedAt: "2024-03-15",
		rarity: "Common",
	},
	{
		id: 2,
		title: "Speed Runner",
		description: "Complete a game in under 2 hours",
		icon: Trophy,
		progress: 75,
		unlocked: false,
		rarity: "Rare",
	},
	{
		id: 3,
		title: "Completionist",
		description: "100% complete any game",
		icon: Trophy,
		progress: 45,
		unlocked: false,
		rarity: "Epic",
	},
	// Add more achievements as needed
];

export function AchievementsPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">
						Achievements
					</h1>
					<p className="text-muted-foreground mt-1">
						Track your gaming milestones and accomplishments
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Input placeholder="Search achievements..." className="w-[300px]" />
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Total Achievements</h3>
						<Trophy className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Completion Rate</h3>
						<Trophy className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">68%</div>
						<p className="text-xs text-muted-foreground">Across all games</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Recent Unlocks</h3>
						<Trophy className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3</div>
						<p className="text-xs text-muted-foreground">In the last 7 days</p>
					</CardContent>
				</Card>
			</div>

			{/* Achievements Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{achievements.map((achievement) => (
					<Card
						key={achievement.id}
						className={cn(
							"transition-colors hover:bg-muted/50",
							achievement.unlocked ? "border-green-500/20" : "border-muted",
						)}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<div className="flex items-center gap-2">
								<achievement.icon
									className={cn(
										"h-5 w-5",
										achievement.unlocked
											? "text-green-500"
											: "text-muted-foreground",
									)}
								/>
								<h3 className="font-medium">{achievement.title}</h3>
							</div>
							<Badge
								variant="secondary"
								className={cn(
									"text-xs",
									achievement.rarity === "Epic" &&
										"bg-purple-500/10 text-purple-500",
									achievement.rarity === "Rare" &&
										"bg-blue-500/10 text-blue-500",
									achievement.rarity === "Common" &&
										"bg-gray-500/10 text-gray-500",
								)}
							>
								{achievement.rarity}
							</Badge>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								{achievement.description}
							</p>
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span>Progress</span>
									<span>{achievement.progress}%</span>
								</div>
								<Progress value={achievement.progress} />
								{achievement.unlocked && (
									<p className="text-xs text-muted-foreground">
										Unlocked on {achievement.unlockedAt}
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
