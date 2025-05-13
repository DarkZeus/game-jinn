import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

// Mock data for favorite games
const favoriteGames = [
	{
		id: 1,
		title: "The Witcher 3",
		cover:
			"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=750&fit=crop",
		progress: 85,
		lastPlayed: "2 days ago",
		playTime: "120h",
		achievements: "45/60",
	},
	{
		id: 2,
		title: "Red Dead Redemption 2",
		cover:
			"https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&h=750&fit=crop",
		progress: 92,
		lastPlayed: "1 week ago",
		playTime: "85h",
		achievements: "38/45",
	},
	{
		id: 3,
		title: "God of War",
		cover:
			"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=750&fit=crop",
		progress: 100,
		lastPlayed: "3 days ago",
		playTime: "45h",
		achievements: "30/30",
	},
];

export function FavoritesPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">Favorites</h1>
					<p className="text-muted-foreground mt-1">
						Your most played and favorite games
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Input placeholder="Search favorites..." className="w-[300px]" />
				</div>
			</div>

			{/* Quick Stats */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Total Playtime</h3>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">250h</div>
						<p className="text-xs text-muted-foreground">
							Across all favorites
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Completion Rate</h3>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">92%</div>
						<p className="text-xs text-muted-foreground">Average completion</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Recent Activity</h3>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3</div>
						<p className="text-xs text-muted-foreground">
							Games played this week
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Favorites Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{favoriteGames.map((game) => (
					<Card
						key={game.id}
						className="group overflow-hidden transition-colors hover:bg-muted/50"
					>
						<div className="relative aspect-[2/3] overflow-hidden">
							<img
								src={game.cover}
								alt={game.title}
								className="object-cover w-full h-full transition-transform group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 p-4">
								<h3 className="text-lg font-semibold text-white">
									{game.title}
								</h3>
							</div>
						</div>
						<CardContent className="p-4">
							<div className="space-y-4">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Last played</span>
									<span>{game.lastPlayed}</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Play time</span>
									<span>{game.playTime}</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Achievements</span>
									<span>{game.achievements}</span>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span>Progress</span>
										<span>{game.progress}%</span>
									</div>
									<Progress value={game.progress} />
								</div>
								<Button className="w-full">Continue Playing</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
