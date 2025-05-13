import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Edit3, Play, Star, Trophy } from "lucide-react";

export const Route = createFileRoute("/games/$gameId")({
	component: GameDetailPage,
});

function GameDetailPage() {
	// Placeholder data
	const game = {
		title: "Elden Ring",
		platform: "PlayStation 5",
		genre: "Action RPG",
		cover: "https://placehold.co/320x180/png?text=Elden+Ring",
		progress: 75,
		playtime: 82,
		achievements: 24,
		totalAchievements: 30,
		favorite: true,
	};

	return (
		<div className="flex flex-col lg:flex-row gap-8">
			{/* Left: Game Info Pane */}
			<aside className="w-full max-w-md flex-shrink-0 space-y-6">
				<Card className="overflow-hidden">
					<div className="aspect-video bg-muted">
						<img
							src={game.cover}
							alt={game.title}
							className="object-cover w-full h-full"
						/>
					</div>
					<CardHeader className="p-6 pb-2">
						<CardTitle className="text-2xl font-bold mb-1">
							{game.title}
						</CardTitle>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span>{game.platform}</span>
							<span>•</span>
							<span>{game.genre}</span>
						</div>
					</CardHeader>
					<CardContent className="p-6 pt-0 space-y-4">
						<div className="flex items-center gap-2">
							<Badge variant="secondary">In Progress</Badge>
							{game.favorite && <Star className="h-4 w-4 text-yellow-500" />}
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">Completion</span>
								<span className="font-medium">{game.progress}%</span>
							</div>
							<Progress value={game.progress} className="h-2" />
						</div>
						<div className="flex items-center gap-4 text-sm">
							<div className="flex items-center gap-2">
								<Trophy className="h-4 w-4 text-muted-foreground" />
								<span>
									{game.achievements}/{game.totalAchievements} Achievements
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span>{game.playtime}h</span>
							</div>
						</div>
						<div className="flex gap-2 pt-2">
							<Button size="sm" variant="default" className="rounded-xl">
								<Play className="h-4 w-4 mr-2" /> Quick Launch
							</Button>
							<Button size="sm" variant="outline" className="rounded-xl">
								<Edit3 className="h-4 w-4 mr-2" /> Edit
							</Button>
						</div>
					</CardContent>
				</Card>
			</aside>

			{/* Right: Tabbed Content */}
			<section className="flex-1 min-w-0">
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="mb-4">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="achievements">Achievements</TabsTrigger>
						<TabsTrigger value="stats">Stats</TabsTrigger>
						<TabsTrigger value="notes">Notes</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">
						<Card>
							<CardHeader>
								<CardTitle>Game Overview</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-base">
									Explore the Lands Between in this epic action RPG. Track your
									journey, progress, and milestones here.
								</p>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="achievements">
						<Card>
							<CardHeader>
								<CardTitle>Achievements</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{[...Array(6)].map((_, i) => (
										<div
											key={i}
											className="rounded-2xl bg-muted p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
										>
											<Trophy className="h-6 w-6 mb-2 text-muted-foreground" />
											<span className="font-medium">Achievement {i + 1}</span>
											<span className="text-xs text-muted-foreground mt-1">
												{i < 4 ? "Unlocked" : "Locked"}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="stats">
						<Card>
							<CardHeader>
								<CardTitle>Game Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground">Playtime</span>
										<span className="font-medium">{game.playtime} hours</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground">Completion</span>
										<span className="font-medium">{game.progress}%</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground">Achievements</span>
										<span className="font-medium">
											{game.achievements}/{game.totalAchievements}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="notes">
						<Card>
							<CardHeader>
								<CardTitle>Notes</CardTitle>
							</CardHeader>
							<CardContent>
								<textarea
									className="w-full min-h-[120px] rounded-xl border border-muted bg-muted p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Write your thoughts or review..."
								/>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
