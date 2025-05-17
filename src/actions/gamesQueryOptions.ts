import { igdbApi } from "@/lib/api/igdb";
import { queryOptions } from "@tanstack/react-query";

export const gamesQueryOptions = queryOptions({
	queryKey: ["games"],
	queryFn: () => igdbApi.getGames(),
});
