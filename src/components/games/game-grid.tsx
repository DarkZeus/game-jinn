import {
	mostAnticipatedGamesQueryOptions,
	searchGamesQueryOptions,
} from "@/actions/gamesQueryOptions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePreloader } from "@/components/ui/image-preloader";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Game } from "@/lib/api/igdb.types";
import { isObject } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Filter, Search, Star } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { GameImage } from "./game-image";

// No props needed - component is now self-contained
/**
 * SearchableGameGrid displays search/filters and a grid of game cards.
 * Handles search state internally to prevent unnecessary page re-renders.
 */
export const SearchableGameGrid = () => {
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 400);

	const gamesQuery = useQuery(
		debouncedSearch
			? searchGamesQueryOptions(debouncedSearch)
			: mostAnticipatedGamesQueryOptions,
	);

	const games = gamesQuery.data || [];
	const isLoading = gamesQuery.isLoading;

	return (
		<div className="space-y-6">
			{/* Preload critical images */}
			<ImagePreloader games={games} count={4} />

			{/* Filters */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search games..."
						className="pl-8"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
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
			{isLoading ? (
				<div className="text-center py-12 text-muted-foreground">
					Loading games...
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{games.map((game, index) => (
						<Card
							key={game.id}
							className="overflow-hidden hover:shadow-md transition-shadow p-0 relative"
						>
							<Link
								to="/games/$gameId-$gameSlug"
								params={{
									"gameId-$gameSlug": `${game.id}-${game.slug}`,
								}}
								className="block h-full"
								viewTransition
							>
								<GameImage
									game={game}
									className="aspect-[4/5] w-full"
									priority={index < 4}
									showScreenshotPreview={true}
								>
									<div className="absolute top-2 right-2">
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Star className="h-4 w-4" />
										</Button>
									</div>
								</GameImage>
								<CardHeader className="p-4">
									<CardTitle className="text-lg">{game.name}</CardTitle>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<span>
											{game.platforms?.[0]?.name || "Unknown Platform"}
										</span>
										<span>•</span>
										<span>{game.genres?.[0]?.name || "Unknown Genre"}</span>
									</div>
								</CardHeader>
							</Link>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

// Keep the original GameGrid component for backward compatibility or other uses
export type GameGridProps = {
	games: Game[];
	isLoading: boolean;
};

export const GameGrid = ({ games, isLoading }: GameGridProps) => {
	if (isLoading) {
		return (
			<div className="text-center py-12 text-muted-foreground">
				Loading games...
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{games.map((game, index) => (
				<Link
					key={game.id}
					to="/games/$gameId-$gameSlug"
					params={{
						"gameId-$gameSlug": `${game.id}-${game.slug}`,
					}}
					className="block"
					viewTransition
				>
					<Card className="overflow-hidden hover:shadow-md transition-shadow p-0">
						<GameImage
							game={game}
							className="aspect-[4/5] w-full bg-muted"
							priority={index < 4}
							showScreenshotPreview={true}
						>
							<div className="absolute top-2 right-2">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Star className="h-4 w-4" />
								</Button>
							</div>
						</GameImage>
						<CardHeader className="p-4">
							<CardTitle className="text-lg">{game.name}</CardTitle>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{game.platforms?.[0]?.name || "Unknown Platform"}</span>
								<span>•</span>
								<span>{game.genres?.[0]?.name || "Unknown Genre"}</span>
							</div>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	);
};
