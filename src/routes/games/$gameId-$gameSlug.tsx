import { GameInfoGrid } from "@/components/games/game-info-grid";
import { GameScreenshotsGallery } from "@/components/games/game-screenshots-gallery";
import { GameStoreLinks } from "@/components/games/game-store-links";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { igdbApi } from "@/lib/api/igdb";
import type { GameWithTimeToBeat } from "@/lib/api/igdb.types";
import type { Screenshot, SimilarGame, Video } from "@/lib/api/igdb.types";
import { isObject } from "@/lib/utils";
import {
	getResponsiveProgressiveImageUrls,
	normalizeIGDBUrl,
} from "@/lib/utils/image";
import {
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId-$gameSlug")({
	component: GameDetailsPage,
	loader: async ({ params }): Promise<{ game: GameWithTimeToBeat }> => {
		const parts = params["gameId-$gameSlug"].split("-");
		const gameId = parts[0];
		const urlSlug = parts.slice(1).join("-");
		const gameRaw = (await igdbApi.getGame(
			Number.parseInt(gameId),
		)) as GameWithTimeToBeat;

		// If the slug doesn't match, redirect to the correct URL
		if (
			!gameRaw ||
			typeof gameRaw !== "object" ||
			!("slug" in gameRaw) ||
			!("id" in gameRaw) ||
			!("name" in gameRaw) ||
			gameRaw.slug !== urlSlug
		) {
			throw redirect({
				to: "/games/$gameId-$gameSlug",
				params: {
					"gameId-$gameSlug": `${gameRaw?.id ?? gameId}-${gameRaw?.slug ?? urlSlug}`,
				},
			});
		}

		return { game: gameRaw };
	},
});

function isValidStoreUrl(category: number, url: string) {
	switch (category) {
		case 13: // Steam
			return url.includes("steampowered.com/app/");
		case 14: // GOG
			return url.includes("gog.com/game/");
		case 16: // Epic Games
			return url.includes("epicgames.com/store/");
		case 15: // Itch.io
			return url.includes("itch.io/");
		case 17: // Google Play
			return url.includes("play.google.com/store/");
		case 18: // App Store
			return url.includes("apps.apple.com/");
		case 20: // PlayStation Store
		case 23: // PlayStation Store (alt)
			return url.includes("store.playstation.com/");
		case 21: // Xbox Store
			return url.includes("xbox.com/");
		case 22: // Nintendo eShop
			return url.includes("nintendo.com/games/detail/");
		default:
			return false;
	}
}

const platformStoreMap: Record<
	string,
	{ category: number; displayName: string }
> = {
	"PC (Microsoft Windows)": { category: 13, displayName: "Steam" },
	"PlayStation 5": { category: 23, displayName: "PlayStation Store" },
	"PlayStation 4": { category: 23, displayName: "PlayStation Store" },
	"Xbox Series X|S": { category: 21, displayName: "Xbox Store" },
	"Xbox One": { category: 21, displayName: "Xbox Store" },
	"Nintendo Switch": { category: 22, displayName: "Nintendo eShop" },
	iOS: { category: 18, displayName: "App Store" },
	Android: { category: 17, displayName: "Google Play" },
	Mac: { category: 13, displayName: "Steam" },
	Linux: { category: 13, displayName: "Steam" },
};

function GameDetailsPage() {
	const { game } = useLoaderData({ from: "/games/$gameId-$gameSlug" });

	// Get responsive image URLs for the cover
	const getCoverImageUrl = () => {
		if (!game.cover || !isObject(game.cover)) return null;

		if (game.cover.image_id) {
			const imageUrls = getResponsiveProgressiveImageUrls(game.cover.image_id);
			return imageUrls.full;
		}

		if (game.cover.url) {
			return normalizeIGDBUrl(game.cover.url);
		}

		return null;
	};

	const coverImageUrl = getCoverImageUrl();

	return (
		<div className="px-4 md:px-12 pb-8 pt-4">
			<div className="flex flex-col md:flex-row gap-8 items-start">
				{/* Left/Main Column */}
				<div className="flex-1 min-w-0 space-y-8">
					{/* Title, Release Date, Meta Badges */}
					<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
						<h1 className="text-4xl font-bold tracking-tight">{game.name}</h1>
						<div className="flex flex-wrap gap-2 items-center">
							{game.first_release_date && (
								<span className="bg-muted px-3 py-1 rounded text-xs font-semibold">
									{new Date(
										game.first_release_date * 1000,
									).toLocaleDateString()}
								</span>
							)}
							{game.timeToBeat && (
								<span className="bg-muted px-3 py-1 rounded text-xs font-semibold">
									Average playtime:{" "}
									{game.timeToBeat &&
									typeof game.timeToBeat.normally === "number"
										? `${Math.round(game.timeToBeat.normally / 3600)}h`
										: "N/A"}
								</span>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-3">
						<Button variant="default">Add to My Games</Button>
						<Button variant="secondary">Add to Wishlist</Button>
						{/* <Button variant="outline">Save to Collection</Button> */}
					</div>

					{/* Ratings, Tags, Stats Placeholder */}
					{/* <div className="bg-muted/60 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:gap-8">
						<div className="flex-1 flex flex-col gap-2">
							<span className="font-bold text-lg">Exceptional</span>
							<span className="text-xs text-muted-foreground">10 ratings</span>
						</div>
						<div className="flex-1 flex flex-wrap gap-2">
							<Badge variant="secondary">Shooter</Badge>
							<Badge variant="secondary">Action</Badge>
							<Badge variant="secondary">Top 2025</Badge>
						</div>
						<div className="flex-1 flex flex-col gap-2">
							<span className="text-xs">#5111 Action</span>
							<span className="text-xs">#14 Top 2025</span>
						</div>
					</div> */}

					{/* About Section */}
					<div>
						<h2 className="text-xl font-semibold mb-2">About</h2>
						<p className="text-muted-foreground">
							{game.summary || "No description available."}
						</p>
					</div>

					{/* Info Grid */}
					<GameInfoGrid />

					{/* System Requirements Placeholder */}
					{/* <div className="bg-muted/40 rounded-lg p-4">
						<h2 className="text-xl font-semibold mb-2">
							System requirements for PC
						</h2>
						<div className="text-muted-foreground">
							Minimum: <br />- 64-bit processor and operating system
						</div>
					</div> */}
				</div>

				{/* Right/Sidebar Column */}
				<div className="w-full md:w-[340px] flex-shrink-0 md:sticky md:top-8 flex flex-col gap-6 items-center">
					{/* Cover Art */}
					<div className="bg-muted rounded-lg overflow-hidden w-full aspect-[3/4] shadow-md mb-2">
						{coverImageUrl && (
							<img
								src={coverImageUrl}
								alt={game.name}
								className="object-cover w-full h-full"
							/>
						)}
					</div>

					{/* Screenshots Row */}
					<GameScreenshotsGallery />

					{/* Where to buy section (overhauled) */}
					<GameStoreLinks />
				</div>
			</div>

			{/* Similar Games */}
			{(game.similar_games?.length ?? 0) > 0 && (
				<div className="mt-8">
					<h2 className="text-lg font-semibold mb-2">Similar Games</h2>
					<div className="flex flex-wrap gap-3">
						{game.similar_games?.map((sg: SimilarGame) => (
							<a
								key={sg.id}
								href={sg.url}
								className="text-blue-500 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								{sg.name}
							</a>
						))}
					</div>
				</div>
			)}

			{/* Videos */}
			{(game.videos?.length ?? 0) > 0 && (
				<div className="mt-8">
					<h2 className="text-lg font-semibold mb-2">Videos</h2>
					<div className="flex flex-wrap gap-3">
						{game.videos?.map((vid: Video) => (
							<a
								key={vid.id}
								href={`https://youtube.com/watch?v=${vid.video_id}`}
								className="text-blue-500 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								{vid.name || vid.video_id}
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
