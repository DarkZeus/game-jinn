import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { igdbApi } from "@/lib/api/igdb";
import type { Game } from "@/lib/api/igdb";
import {
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";
import { Clock, Star, Trophy } from "lucide-react";

export const Route = createFileRoute("/games/$gameId-$gameSlug")({
	component: GameDetailsPage,
	loader: async ({ params }) => {
		const parts = params["gameId-$gameSlug"].split("-");
		const gameId = parts[0];
		const urlSlug = parts.slice(1).join("-");
		const game = await igdbApi.getGame(Number.parseInt(gameId));

		// If the slug doesn't match, redirect to the correct URL
		if (game.slug !== urlSlug) {
			throw redirect({
				to: "/games/$gameId-$gameSlug",
				params: {
					"gameId-$gameSlug": `${game.id}-${game.slug}`,
				},
			});
		}

		return { game };
	},
});

function GameDetailsPage() {
	const { game } = useLoaderData({ from: "/games/$gameId-$gameSlug" });

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold tracking-tight">{game.name}</h1>
					<div className="flex items-center gap-2 text-muted-foreground">
						<span>{game.platforms?.[0]?.name || "Unknown Platform"}</span>
						<span>•</span>
						<span>{game.genres?.[0]?.name || "Unknown Genre"}</span>
						<span>•</span>
						<span>
							{game.first_release_date
								? new Date(game.first_release_date * 1000).getFullYear()
								: "TBA"}
						</span>
					</div>
				</div>
				<Button>Add to Library</Button>
			</div>

			{/* Main Content */}
			<div className="grid gap-6 md:grid-cols-[2fr,1fr]">
				{/* Left Column */}
				<div className="space-y-6">
					{/* Cover Image */}
					<div className="aspect-video bg-muted rounded-lg overflow-hidden">
						{game.cover && (
							<img
								src={game.cover.url}
								alt={game.name}
								className="object-cover w-full h-full"
							/>
						)}
					</div>

					{/* Tabs */}
					<Tabs defaultValue="overview">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="achievements">Achievements</TabsTrigger>
							<TabsTrigger value="dlc">DLC</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>About</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										{game.summary || "No description available."}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Details</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<h4 className="text-sm font-medium mb-2">Platforms</h4>
											<div className="flex flex-wrap gap-2">
												{game.platforms?.map((platform) => (
													<Badge key={platform.id} variant="secondary">
														{platform.name}
													</Badge>
												))}
											</div>
										</div>
										<div>
											<h4 className="text-sm font-medium mb-2">Genres</h4>
											<div className="flex flex-wrap gap-2">
												{game.genres?.map((genre) => (
													<Badge key={genre.id} variant="secondary">
														{genre.name}
													</Badge>
												))}
											</div>
										</div>
										<div>
											<h4 className="text-sm font-medium mb-2">Game Modes</h4>
											<div className="flex flex-wrap gap-2">
												{game.game_modes?.map((mode) => (
													<Badge key={mode.id} variant="secondary">
														{mode.name}
													</Badge>
												))}
											</div>
										</div>
										<div>
											<h4 className="text-sm font-medium mb-2">Themes</h4>
											<div className="flex flex-wrap gap-2">
												{game.themes?.map((theme) => (
													<Badge key={theme.id} variant="secondary">
														{theme.name}
													</Badge>
												))}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="achievements">
							<Card>
								<CardHeader>
									<CardTitle>Achievements</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										No achievements available.
									</p>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="dlc">
							<Card>
								<CardHeader>
									<CardTitle>DLC</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">No DLC available.</p>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					{/* Stats */}
					<Card>
						<CardHeader>
							<CardTitle>Stats</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<div className="flex items-center justify-between text-sm mb-2">
									<span className="text-muted-foreground">Rating</span>
									<span className="font-medium">
										{game.aggregated_rating
											? `${Math.round(game.aggregated_rating)}%`
											: "N/A"}
									</span>
								</div>
								<Progress value={game.aggregated_rating || 0} className="h-2" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center gap-2">
									<Trophy className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium">
											{game.rating_count || 0}
										</p>
										<p className="text-xs text-muted-foreground">Ratings</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium">
											{game.first_release_date
												? new Date(game.first_release_date * 1000).getFullYear()
												: "TBA"}
										</p>
										<p className="text-xs text-muted-foreground">
											Release Date
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Websites */}
					<Card>
						<CardHeader>
							<CardTitle>Links</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								{game.websites?.map((website) => (
									<a
										key={website.id}
										href={website.url}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-sm text-blue-500 hover:underline"
									>
										{website.category === 1
											? "Official Website"
											: website.category === 2
												? "Wikia"
												: website.category === 3
													? "Wikipedia"
													: website.category === 4
														? "Facebook"
														: website.category === 5
															? "Twitter"
															: website.category === 6
																? "Twitch"
																: website.category === 8
																	? "Instagram"
																	: website.category === 9
																		? "YouTube"
																		: "Other"}
									</a>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
