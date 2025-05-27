import type { GameWithTimeToBeat } from "@/lib/api/igdb.types";

export const parseGameIdAndSlug = (gameIdWithSlug: string) => {
	const parts = gameIdWithSlug.split("-");
	return {
		gameId: parts[0],
		urlSlug: parts.slice(1).join("-"),
	};
};

export const isValidGameData = (game: unknown): game is GameWithTimeToBeat => {
	return (
		!!game &&
		typeof game === "object" &&
		"slug" in game &&
		"id" in game &&
		"name" in game
	);
};

export const createRedirectParams = (
	gameId: string,
	game: GameWithTimeToBeat | null,
	urlSlug: string,
) => {
	return `${game?.id ?? gameId}-${game?.slug ?? urlSlug}`;
};
