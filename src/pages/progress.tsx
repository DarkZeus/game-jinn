import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	BarChart3,
	Calendar,
	Clock,
	Gamepad2,
	LineChart,
	Target,
	Trophy,
} from "lucide-react";

// Mock data for progress tracking
const progressData = {
	overall: {
		completion: 68,
		playTime: 450,
		achievements: 245,
		recentActivity: [
			{ game: "The Witcher 3", progress: 85, time: "120h" },
			{ game: "Red Dead Redemption 2", progress: 92, time: "85h" },
			{ game: "God of War", progress: 100, time: "45h" },
		],
	},
	milestones: [
		{
			id: 1,
			title: "100 Hours Played",
			description: "Reach 100 hours of total playtime",
			progress: 75,
			icon: Clock,
		},
		{
			id: 2,
			title: "50 Games Completed",
			description: "Complete 50 different games",
			progress: 45,
			icon: Gamepad2,
		},
		{
			id: 3,
			title: "Achievement Hunter",
			description: "Unlock 300 achievements",
			progress: 82,
			icon: Trophy,
		},
	],
};

export function ProgressPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">
						Progress Hub
					</h1>
					<p className="text-muted-foreground mt-1">
						Track your gaming journey and milestones
					</p>
				</div>
			</div>

			{/* Main Stats */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Overall Completion</h3>
						<LineChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{progressData.overall.completion}%
						</div>
						<p className="text-xs text-muted-foreground">Across all games</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Total Playtime</h3>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{progressData.overall.playTime}h
						</div>
						<p className="text-xs text-muted-foreground">Lifetime hours</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Achievements</h3>
						<Trophy className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{progressData.overall.achievements}
						</div>
						<p className="text-xs text-muted-foreground">Total unlocked</p>
					</CardContent>
				</Card>
			</div>

			{/* Tabs for different views */}
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="milestones">Milestones</TabsTrigger>
					<TabsTrigger value="recent">Recent Activity</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Progress Overview</h3>
						</CardHeader>
						<CardContent>
							<div className="h-[300px] flex items-center justify-center text-muted-foreground">
								[Chart visualization will go here]
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="milestones" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{progressData.milestones.map((milestone) => (
							<Card key={milestone.id}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<div className="flex items-center gap-2">
										<milestone.icon className="h-4 w-4 text-muted-foreground" />
										<h3 className="text-sm font-medium">{milestone.title}</h3>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground mb-4">
										{milestone.description}
									</p>
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span>Progress</span>
											<span>{milestone.progress}%</span>
										</div>
										<Progress value={milestone.progress} />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="recent" className="space-y-4">
					<Card>
						<CardHeader>
							<h3 className="text-lg font-medium">Recent Activity</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{progressData.overall.recentActivity.map((activity, index) => (
									<div
										key={index}
										className="flex items-center justify-between"
									>
										<div className="space-y-1">
											<p className="text-sm font-medium">{activity.game}</p>
											<p className="text-xs text-muted-foreground">
												{activity.time} played
											</p>
										</div>
										<div className="flex items-center gap-4">
											<div className="w-[100px]">
												<Progress value={activity.progress} />
											</div>
											<span className="text-sm font-medium">
												{activity.progress}%
											</span>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
