import { igdbApi } from "@/lib/api/igdb";
import { queryOptions } from "@tanstack/react-query";

export const mostAnticipatedGamesQueryOptions = queryOptions({
	queryKey: ["most-anticipated-games"],
	queryFn: () => igdbApi.getMostAnticipatedGames(),
});

export function searchGamesQueryOptions(search: string) {
	return {
		queryKey: ["searchGames", search],
		queryFn: () => igdbApi.searchGames(search),
		staleTime: 1000 * 60, // 1 minute
	};
}
