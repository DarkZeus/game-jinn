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
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { GameImage } from "./game-image";
import { GamesSkeleton } from "./skeleton";

// SearchInput component - handles search state internally to prevent grid re-renders
type SearchInputProps = {
	onSearchChange: (search: string) => void;
};

const SearchInput = ({ onSearchChange }: SearchInputProps) => {
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 400);

	// Update parent when debounced search changes
	useEffect(() => {
		onSearchChange(debouncedSearch);
	}, [debouncedSearch, onSearchChange]);

	return (
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
	);
};

// No props needed - component is now self-contained
/**
 * SearchableGameGrid displays search/filters and a grid of game cards.
 * Now optimized to prevent unnecessary re-renders during search input.
 */
export const SearchableGameGrid = () => {
	const [debouncedSearch, setDebouncedSearch] = useState("");

	const gamesQuery = useQuery(
		debouncedSearch
			? searchGamesQueryOptions(debouncedSearch)
			: mostAnticipatedGamesQueryOptions,
	);

	const games = gamesQuery.data || [];
	const isLoading = gamesQuery.isLoading;
	const hasSearchTerm = debouncedSearch.trim().length > 0;
	const showNoResults = !isLoading && games.length === 0 && hasSearchTerm;

	return (
		<div className="space-y-6">
			{/* Preload critical images */}
			{/* <ImagePreloader games={games} count={4} /> */}

			{/* Filters */}
			<div className="flex items-center gap-4">
				<SearchInput onSearchChange={setDebouncedSearch} />
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
				<GamesSkeleton />
			) : showNoResults ? (
				<div className="text-center py-12">
					<div className="text-muted-foreground mb-2">
						No games found for "{debouncedSearch}"
					</div>
					<div className="text-sm text-muted-foreground">
						Try adjusting your search terms or browse our most anticipated games
					</div>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{games.map((game, index) => (
						<Card
							key={game.id}
							className="group overflow-hidden hover:shadow-2xl focus-within:shadow-2xl transition-all duration-300 p-0 relative bg-gradient-to-b from-neutral-900 to-black border-neutral-800 hover:border-neutral-600 focus-within:border-neutral-600"
						>
							<Link
								to="/games/$gameId-$gameSlug"
								params={{
									"gameId-$gameSlug": `${game.id}-${game.slug}`,
								}}
								className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
								viewTransition
							>
								<div className="relative">
									<GameImage
										game={game}
										className="aspect-[3/4] w-full object-cover"
										priority={index < 4}
										showScreenshotPreview={true}
									/>
									{/* Gradient overlay for better text readability */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

									{/* Star button */}
									<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
										<Button
											variant="secondary"
											size="icon"
											className="h-8 w-8 bg-black/50 hover:bg-black/70 border-none"
										>
											<Star className="h-4 w-4 text-yellow-400" />
										</Button>
									</div>

									{/* Game info overlay */}
									<div className="absolute bottom-0 left-0 right-0 p-4">
										<h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 group-focus-within:text-blue-400 transition-colors duration-200">
											{game.name}
										</h3>

										{/* Additional info - positioned absolutely to not affect title position */}
										<div className="absolute bottom-full left-0 right-0 p-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0">
											{/* Basic info */}
											<div className="flex items-center gap-2 text-sm text-neutral-300 mb-3">
												<span className="px-2 py-1 bg-neutral-800/80 rounded text-xs font-medium">
													{game.platforms?.[0]?.name || "PC"}
												</span>
												<span className="text-neutral-500">•</span>
												<span>{game.genres?.[0]?.name || "Action"}</span>
											</div>

											{/* Detailed info */}
											<div className="space-y-2">
												<div className="flex items-center gap-3 text-xs text-neutral-400">
													{game.first_release_date && (
														<div className="flex items-center gap-1">
															<span className="text-neutral-500">Release:</span>
															<span className="text-white font-medium">
																{new Intl.DateTimeFormat("uk-UA").format(
																	new Date(game.first_release_date * 1000),
																)}
															</span>
														</div>
													)}
													{game.rating && (
														<div className="flex items-center gap-1">
															<span className="text-neutral-500">Rating:</span>
															<span className="text-green-400 font-medium">
																{Math.round(game.rating)}%
															</span>
														</div>
													)}
												</div>

												{game.genres && game.genres.length > 1 && (
													<div className="flex flex-wrap gap-1">
														{game.genres.slice(0, 3).map((genre) => (
															<span
																key={genre.id}
																className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs border border-blue-600/30"
															>
																{genre.name}
															</span>
														))}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
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
