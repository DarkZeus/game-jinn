import { GameAbout } from "@/components/games/game-about";
import { GameActions } from "@/components/games/game-actions";
import { GameCover } from "@/components/games/game-cover";
import { GameDetailsTabs } from "@/components/games/game-details-tabs";
import { GameHeader } from "@/components/games/game-header";
import { GameScreenshotsGallery } from "@/components/games/game-screenshots-gallery";
import { GameStoreLinks } from "@/components/games/game-store-links";
import { igdbApi } from "@/lib/api/igdb";
import type { GameWithTimeToBeat } from "@/lib/api/igdb.types";
import {
	createRedirectParams,
	isValidGameData,
	parseGameIdAndSlug,
} from "@/lib/utils/game";
import { getScreenshotUrls } from "@/lib/utils/image";
import {
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";

// Types for better type safety
type RouteParams = {
	gameIdWithSlug: string;
};

type LoaderData = {
	game: GameWithTimeToBeat;
};

// Main loader function with early returns and guard clauses
const gameDetailsLoader = async ({
	params,
}: { params: RouteParams }): Promise<LoaderData> => {
	const { gameId, urlSlug } = parseGameIdAndSlug(params.gameIdWithSlug);

	const gameRaw = (await igdbApi.getGame(
		Number.parseInt(gameId),
	)) as GameWithTimeToBeat;

	// Early return with redirect if game data is invalid or slug doesn't match
	if (!isValidGameData(gameRaw) || gameRaw.slug !== urlSlug) {
		throw redirect({
			to: "/games/$gameIdWithSlug",
			params: {
				gameIdWithSlug: createRedirectParams(gameId, gameRaw, urlSlug),
			},
		});
	}

	return { game: gameRaw };
};

const GameDetailsPage = () => {
	const { game } = useLoaderData({ from: "/games/$gameIdWithSlug" });

	// Get background screenshot URL
	const getBackgroundImageUrl = () => {
		const screenshots = [...(game.screenshots || []), ...(game.artworks || [])];
		if (screenshots.length === 0) return null;

		// Use the first screenshot/artwork as background
		const firstImage = screenshots[0];
		if (firstImage?.image_id) {
			const screenshotUrls = getScreenshotUrls(firstImage.image_id);
			return screenshotUrls.fullRes;
		}

		return null;
	};

	const backgroundImageUrl = getBackgroundImageUrl();

	return (
		<div className="relative min-h-screen p-3">
			{/* Main Content */}
			<div className="relative px-4 md:px-12 py-8">
				{/* Background Screenshot with Fade - scoped to content area */}
				{backgroundImageUrl && (
					<div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
						<div
							className="absolute inset-0 bg-cover bg-center bg-no-repeat"
							style={{ backgroundImage: `url(${backgroundImageUrl})` }}
						/>
						{/* Gradient overlays for fade effect */}
						<div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
						<div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-background/70" />
					</div>
				)}

				<div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
					{/* Main Content */}
					<div className="flex-1 min-w-0 space-y-8">
						<GameHeader />
						<GameActions />
						<GameAbout />
						<GameDetailsTabs />
					</div>

					{/* Sidebar */}
					<div className="w-full md:w-[340px] flex-shrink-0 md:top-8 flex flex-col gap-6 items-center">
						<GameCover />
						<GameScreenshotsGallery />
						<GameStoreLinks />
					</div>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/games/$gameIdWithSlug")({
	component: GameDetailsPage,
	loader: gameDetailsLoader,
});
