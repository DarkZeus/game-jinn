import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Clock, Gamepad2, Trophy } from "lucide-react";

// Mock data for statistics
const stats = {
	totalPlayTime: "1,234h",
	totalGames: 42,
	totalAchievements: 156,
	averageSessionLength: "2.5h",
	mostPlayedGame: "The Witcher 3",
	completionRate: "68%",
	recentAchievements: 12,
	weeklyPlayTime: "24h",
};

const timeDistribution = [
	{ game: "The Witcher 3", hours: 320 },
	{ game: "Red Dead Redemption 2", hours: 280 },
	{ game: "God of War", hours: 150 },
	{ game: "Cyberpunk 2077", hours: 120 },
	{ game: "Elden Ring", hours: 90 },
];

export function StatisticsPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">Statistics</h1>
					<p className="text-muted-foreground mt-1">
						Track your gaming progress and achievements
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Select defaultValue="30">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select period" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7">Last 7 days</SelectItem>
							<SelectItem value="30">Last 30 days</SelectItem>
							<SelectItem value="90">Last 90 days</SelectItem>
							<SelectItem value="365">Last year</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Overview Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Total Play Time</h3>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalPlayTime}</div>
						<p className="text-xs text-muted-foreground">
							+12% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Games Played</h3>
						<Gamepad2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalGames}</div>
						<p className="text-xs text-muted-foreground">
							{stats.completionRate} completion rate
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Achievements</h3>
						<Trophy className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalAchievements}</div>
						<p className="text-xs text-muted-foreground">
							+{stats.recentAchievements} this month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Avg. Session</h3>
						<BarChart3 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.averageSessionLength}
						</div>
						<p className="text-xs text-muted-foreground">
							{stats.weeklyPlayTime} this week
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Detailed Statistics */}
			<Tabs defaultValue="time" className="space-y-4">
				<TabsList>
					<TabsTrigger value="time">Time Distribution</TabsTrigger>
					<TabsTrigger value="achievements">Achievements</TabsTrigger>
					<TabsTrigger value="trends">Trends</TabsTrigger>
				</TabsList>
				<TabsContent value="time" className="space-y-4">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Time Distribution</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{timeDistribution.map((item) => (
									<div key={item.game} className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">{item.game}</span>
											<span className="text-sm text-muted-foreground">
												{item.hours}h
											</span>
										</div>
										<div className="h-2 bg-muted rounded-full overflow-hidden">
											<div
												className="h-full bg-primary"
												style={{
													width: `${
														(item.hours / timeDistribution[0].hours) * 100
													}%`,
												}}
											/>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="achievements">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Achievement Progress</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<h4 className="text-sm font-medium">Most Achieved</h4>
										<div className="space-y-2">
											{["Speed Runner", "Completionist", "Collector"].map(
												(achievement) => (
													<div
														key={achievement}
														className="flex items-center justify-between text-sm"
													>
														<span>{achievement}</span>
														<span className="text-muted-foreground">85%</span>
													</div>
												),
											)}
										</div>
									</div>
									<div className="space-y-2">
										<h4 className="text-sm font-medium">Recent Achievements</h4>
										<div className="space-y-2">
											{["First Victory", "Speed Runner", "Collector"].map(
												(achievement) => (
													<div
														key={achievement}
														className="flex items-center justify-between text-sm"
													>
														<span>{achievement}</span>
														<span className="text-muted-foreground">
															2 days ago
														</span>
													</div>
												),
											)}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="trends">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Gaming Trends</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<h4 className="text-sm font-medium">Play Time Trends</h4>
										<div className="space-y-2">
											{["Morning", "Afternoon", "Evening", "Night"].map(
												(time) => (
													<div
														key={time}
														className="flex items-center justify-between text-sm"
													>
														<span>{time}</span>
														<span className="text-muted-foreground">
															{Math.floor(Math.random() * 100)}%
														</span>
													</div>
												),
											)}
										</div>
									</div>
									<div className="space-y-2">
										<h4 className="text-sm font-medium">Genre Distribution</h4>
										<div className="space-y-2">
											{["RPG", "Action", "Adventure", "Strategy"].map(
												(genre) => (
													<div
														key={genre}
														className="flex items-center justify-between text-sm"
													>
														<span>{genre}</span>
														<span className="text-muted-foreground">
															{Math.floor(Math.random() * 100)}%
														</span>
													</div>
												),
											)}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
