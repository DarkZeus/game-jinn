import {
	mostAnticipatedGamesQueryOptions,
	searchGamesQueryOptions,
} from "@/actions/gamesQueryOptions";
import { GameGrid } from "@/components/games/game-grid";
import { GamesSkeleton } from "@/components/games/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, Grid, List, Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export const Route = createFileRoute("/games/")({
	loader: async ({ context: { queryClient } }) =>
		await queryClient.ensureQueryData(mostAnticipatedGamesQueryOptions),
	pendingMinMs: 1,
	pendingMs: 1,
	component: GamesPage,
	pendingComponent: GamesSkeleton,
});

function GamesPage() {
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 400);

	const gamesQuery = useSuspenseQuery(
		debouncedSearch
			? searchGamesQueryOptions(debouncedSearch)
			: mostAnticipatedGamesQueryOptions,
	);

	const games = gamesQuery.data;
	const isLoading = gamesQuery.isLoading;

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
			<GameGrid games={games} isLoading={isLoading} />
		</div>
	);
}
