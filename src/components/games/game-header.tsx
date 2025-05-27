import type { GameWithTimeToBeat } from "@/lib/api/igdb.types";
import { formatReleaseDate } from "@/lib/utils/date";
import { useLoaderData } from "@tanstack/react-router";

const formatPlaytime = (
	timeToBeat: GameWithTimeToBeat["timeToBeat"],
): string => {
	if (!timeToBeat || typeof timeToBeat.normally !== "number") {
		return "N/A";
	}
	return `${Math.round(timeToBeat.normally / 3600)}h`;
};

export const GameHeader = () => {
	const { game } = useLoaderData({ from: "/games/$gameIdWithSlug" });

	return (
		<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
			<h1 className="text-4xl font-bold tracking-tight">{game.name}</h1>
			<div className="flex flex-wrap gap-2 items-center">
				{game.first_release_date && (
					<span className="bg-muted px-3 py-1 rounded text-xs font-semibold">
						{formatReleaseDate(game.first_release_date)}
					</span>
				)}
				{game.timeToBeat && (
					<span className="bg-muted px-3 py-1 rounded text-xs font-semibold">
						Average playtime: {formatPlaytime(game.timeToBeat)}
					</span>
				)}
			</div>
		</div>
	);
};
