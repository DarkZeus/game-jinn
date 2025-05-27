import {
	mostAnticipatedGamesQueryOptions,
	searchGamesQueryOptions,
} from "@/actions/gamesQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { GameCard } from "./game-card";
import { GameEmptyState } from "./game-empty-state";
import { GameFilters } from "./game-filters";
import { GameSearchInput } from "./game-search-input";
import { GamesSkeleton } from "./skeleton";

/**
 * SearchableGameGrid displays search/filters and a grid of game cards.
 * Uses URL search params for search state management.
 */
export const SearchableGameGrid = () => {
	const [search] = useQueryState("search", parseAsString.withDefault(""));
	const [debouncedSearch] = useDebounce(search, 400);

	const { data: games = [], isLoading } = useQuery(
		debouncedSearch
			? searchGamesQueryOptions(debouncedSearch)
			: mostAnticipatedGamesQueryOptions,
	);

	const hasSearchTerm = debouncedSearch.trim().length > 0;
	const showNoResults = !isLoading && games.length === 0 && hasSearchTerm;

	return (
		<div className="space-y-6">
			{/* Search and Filters */}
			<div className="flex items-center gap-4">
				<GameSearchInput />
				<GameFilters />
			</div>

			{/* Games Grid */}
			{isLoading ? (
				<GamesSkeleton />
			) : showNoResults ? (
				<GameEmptyState searchTerm={debouncedSearch} />
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{games.map((game, index) => (
						<GameCard key={game.id} game={game} index={index} />
					))}
				</div>
			)}
		</div>
	);
};
