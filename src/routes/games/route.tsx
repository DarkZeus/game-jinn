import { gamesQueryOptions } from "@/actions/gamesQueryOptions";
import { GamesSkeleton } from "@/components/games/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Game } from "@/lib/api/igdb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { Clock, Filter, Grid, List, Search, Star, Trophy } from "lucide-react";

export const Route = createFileRoute("/games")({
	loader: async ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(gamesQueryOptions),
	component: GamesPage,
	pendingComponent: () => GamesSkeleton,
});

function GamesPage() {
	const gamesQuery = useSuspenseQuery(gamesQueryOptions);
	const games = gamesQuery.data;

	const router = useRouter();
	const { isLoading } = router.state;

	if (isLoading) {
		return (
			<div className="space-y-6">
				{/* Header Skeleton */}
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<Skeleton className="h-9 w-[200px]" />
						<Skeleton className="h-4 w-[300px]" />
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="h-9 w-9" />
						<Skeleton className="h-9 w-9" />
					</div>
				</div>

				{/* Filters Skeleton */}
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 flex-1" />
					<Skeleton className="h-10 w-[180px]" />
					<Skeleton className="h-10 w-[180px]" />
					<Skeleton className="h-10 w-10" />
				</div>

				{/* Games Grid Skeleton */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<Card key={`skeleton-${i}`} className="overflow-hidden">
							<Skeleton className="aspect-video w-full" />
							<CardHeader className="p-4">
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-1/2 mt-2" />
							</CardHeader>
							<CardContent className="p-4 pt-0">
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-2 w-full" />
									<div className="flex items-center justify-between">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-4 w-24" />
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold tracking-tight">Games Library</h1>
					<p className="text-muted-foreground">
						Browse and manage your game collection
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon">
						<Grid className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon">
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input type="search" placeholder="Search games..." className="pl-8" />
				</div>
				<Select defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Platform" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Platforms</SelectItem>
						<SelectItem value="pc">PC</SelectItem>
						<SelectItem value="ps5">PlayStation 5</SelectItem>
						<SelectItem value="xbox">Xbox Series X</SelectItem>
						<SelectItem value="switch">Nintendo Switch</SelectItem>
					</SelectContent>
				</Select>
				<Select defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="playing">Currently Playing</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
						<SelectItem value="backlog">Backlog</SelectItem>
					</SelectContent>
				</Select>
				<Button variant="outline" size="icon">
					<Filter className="h-4 w-4" />
				</Button>
			</div>

			{/* Games Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{games.map((game: Game) => (
					<Link
						key={game.id}
						to="/games/$gameId-$gameSlug"
						params={{
							"gameId-$gameSlug": `${game.id}-${game.slug}`,
						}}
						className="block"
					>
						<Card className="overflow-hidden hover:shadow-md transition-shadow">
							<div className="aspect-video bg-muted relative">
								{game.cover && (
									<img
										src={game.cover.url}
										alt={game.name}
										className="object-cover w-full h-full"
									/>
								)}
								<div className="absolute top-2 right-2">
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Star className="h-4 w-4" />
									</Button>
								</div>
							</div>
							<CardHeader className="p-4">
								<CardTitle className="text-lg">{game.name}</CardTitle>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<span>{game.platforms?.[0]?.name || "Unknown Platform"}</span>
									<span>•</span>
									<span>{game.genres?.[0]?.name || "Unknown Genre"}</span>
								</div>
							</CardHeader>
							<CardContent className="p-4 pt-0">
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Rating</span>
										<span className="font-medium">
											{game.aggregated_rating
												? `${Math.round(game.aggregated_rating)}%`
												: "N/A"}
										</span>
									</div>
									<Progress
										value={game.aggregated_rating || 0}
										className="h-2"
									/>
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center gap-2">
											<Trophy className="h-4 w-4 text-muted-foreground" />
											<span>{game.rating_count || 0} ratings</span>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span>
												{game.first_release_date
													? new Date(
															game.first_release_date * 1000,
														).getFullYear()
													: "TBA"}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
