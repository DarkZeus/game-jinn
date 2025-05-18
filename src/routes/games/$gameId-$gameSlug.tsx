import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { igdbApi } from "@/lib/api/igdb";
import type { GameWithTimeToBeat, TimeToBeat } from "@/lib/api/igdb";
import type {
	AlternativeName,
	Franchise,
	Game,
	GameEngine,
	GameMode,
	Genre,
	InvolvedCompany,
	Keyword,
	Platform,
	PlayerPerspective,
	Screenshot,
	SimilarGame,
	Video,
	Website,
} from "@/lib/api/igdb.types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
	// Screenshots may not match the full Screenshot type, so define a minimal type
	const screenshots: Screenshot[] = game.screenshots || [];

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
							{/* Placeholder meta badges */}
							<span className="bg-muted px-3 py-1 rounded text-xs font-semibold">
								Average playtime:{" "}
								{game.timeToBeat && typeof game.timeToBeat.normally === "number"
									? `${Math.round(game.timeToBeat.normally / 3600)}h`
									: "N/A"}
							</span>
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/40 rounded-lg p-4">
						<div>
							<h4 className="text-sm font-medium mb-1">Platforms</h4>
							<div className="flex flex-wrap gap-2">
								{game.platforms?.map((platform: Platform) => (
									<Badge key={platform.id} variant="secondary">
										{platform.name}
									</Badge>
								)) || <span className="text-muted-foreground">N/A</span>}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Genres</h4>
							<div className="flex flex-wrap gap-2">
								{game.genres?.map((genre: Genre) => (
									<Badge key={genre.id} variant="secondary">
										{genre.name}
									</Badge>
								)) || <span className="text-muted-foreground">N/A</span>}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Release Date</h4>
							<div>
								{game.first_release_date ? (
									new Date(game.first_release_date * 1000).toLocaleDateString()
								) : (
									<span className="text-muted-foreground">TBA</span>
								)}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Alternative Names</h4>
							<div className="flex flex-wrap gap-2">
								{game.alternative_names?.length ? (
									game.alternative_names.map((alt: AlternativeName) => (
										<Badge key={alt.id} variant="outline">
											{alt.name}
										</Badge>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Franchise</h4>
							<div>
								{game.franchises?.length ? (
									game.franchises.map((fr: Franchise) => (
										<a
											key={fr.id}
											href={fr.url}
											className="text-blue-500 hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{fr.name}
										</a>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Engine</h4>
							<div>
								{game.game_engines?.length ? (
									game.game_engines.map((eng: GameEngine) => (
										<a
											key={eng.id}
											href={eng.url}
											className="text-blue-500 hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{eng.name}
										</a>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Involved Companies</h4>
							<div>
								{game.involved_companies?.length ? (
									game.involved_companies.map((ic: InvolvedCompany) => (
										<span key={ic.id} className="inline-block mr-2">
											{ic.company && (
												<>
													{ic.company.name}
													{ic.developer && " (Developer)"}
													{ic.publisher && " (Publisher)"}
												</>
											)}
										</span>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div className="md:col-span-2">
							<h4 className="text-sm font-medium mb-1">Tags</h4>
							<div className="flex flex-wrap gap-2">
								{game.keywords?.length ? (
									game.keywords.map((kw: Keyword) => (
										<Badge key={kw.id} variant="outline">
											{kw.name}
										</Badge>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Player Perspectives</h4>
							<div className="flex flex-wrap gap-2">
								{game.player_perspectives?.length ? (
									game.player_perspectives.map((pp: PlayerPerspective) => (
										<Badge key={pp.id} variant="outline">
											{pp.name}
										</Badge>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div>
							<h4 className="text-sm font-medium mb-1">Game Modes</h4>
							<div className="flex flex-wrap gap-2">
								{game.game_modes?.length ? (
									game.game_modes.map((gm: GameMode) => (
										<Badge key={gm.id} variant="outline">
											{gm.name}
										</Badge>
									))
								) : (
									<span className="text-muted-foreground">N/A</span>
								)}
							</div>
						</div>
						<div className="md:col-span-2">
							<h4 className="text-sm font-medium mb-1">Website</h4>
							<div>
								{(() => {
									const official = game.websites?.find(
										(w: Website) => w.category === 1 && w.url,
									);
									if (!official)
										return <span className="text-muted-foreground">N/A</span>;
									return (
										<a
											href={official.url}
											className="text-blue-500 hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{official.url.replace(/^https?:\/\//, "")}
										</a>
									);
								})()}
							</div>
						</div>
					</div>

					{/* System Requirements Placeholder */}
					<div className="bg-muted/40 rounded-lg p-4">
						<h2 className="text-xl font-semibold mb-2">
							System requirements for PC
						</h2>
						<div className="text-muted-foreground">
							Minimum: <br />- 64-bit processor and operating system
						</div>
					</div>
				</div>

				{/* Right/Sidebar Column */}
				<div className="w-full md:w-[340px] flex-shrink-0 md:sticky md:top-8 flex flex-col gap-6 items-center">
					{/* Cover Art */}
					<div className="bg-muted rounded-lg overflow-hidden w-full aspect-[3/4] shadow-md mb-2">
						{game.cover && (
							<img
								src={
									game.cover.image_id
										? `//images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.webp`
										: game.cover.url.startsWith("//")
											? `https:${game.cover.url}`
											: game.cover.url
								}
								alt={game.name}
								className="object-cover w-full h-full"
							/>
						)}
					</div>

					{/* Screenshots Row */}
					{screenshots.length > 0 && (
						<div className="flex gap-2 w-full overflow-x-auto pb-2">
							{screenshots.map((shot: Screenshot, idx: number) => (
								<Dialog key={shot.id}>
									<DialogTrigger asChild>
										<img
											src={
												shot.image_id
													? `//images.igdb.com/igdb/image/upload/t_720p/${shot.image_id}.webp`
													: shot.url.startsWith("//")
														? `https:${shot.url}`
														: shot.url
											}
											alt={`${game.name} screenshot`}
											className="rounded-lg object-cover h-24 w-auto min-w-[120px] cursor-pointer hover:brightness-90 transition"
										/>
									</DialogTrigger>
									<DialogContent className="min-w-[90svw] grid-rows-[auto_minmax(0,1fr)_auto] px-0 py-0 h-[90svh]">
										<VisuallyHidden>
											<DialogHeader className="p-6 pb-0">
												<DialogTitle>{game.name}</DialogTitle>
												<DialogDescription>
													Screenshot {idx + 1} of {screenshots.length}
												</DialogDescription>
											</DialogHeader>
										</VisuallyHidden>
										<div className="grid gap-4 py-4 overflow-y-auto h-dvh items-center">
											<div className="flex flex-col justify-between items-center">
												<img
													src={
														shot.image_id
															? `//images.igdb.com/igdb/image/upload/t_1080p_2x/${shot.image_id}.webp`
															: shot.url.startsWith("//")
																? `https:${shot.url}`
																: shot.url
													}
													alt={`${game.name} screenshot`}
													className="rounded-lg object-cover"
												/>
											</div>
										</div>
									</DialogContent>
								</Dialog>
							))}
						</div>
					)}

					{/* Where to buy section (overhauled) */}
					<div className="w-full bg-muted/40 rounded-lg p-4">
						<h4 className="font-semibold mb-2">Where to buy</h4>
						{game.websites && (
							<div className="flex flex-col gap-2">
								{/* Store Buttons */}
								{game.platforms &&
									game.websites &&
									game.platforms.map((platform: Platform) => {
										const store = platformStoreMap[platform.name];
										if (!store) return null;
										const website = game.websites?.find(
											(w: Website) =>
												w.category === store.category &&
												isValidStoreUrl(w.category, w.url),
										);
										if (!website) return null;
										return (
											<Button
												asChild
												variant="secondary"
												size="sm"
												className="w-full"
												key={platform.id}
											>
												<a
													href={website.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{store.displayName} ({platform.name})
												</a>
											</Button>
										);
									})}
								{/* If no buttons rendered, show fallback */}
								{game.platforms &&
									game.websites &&
									game.platforms.every((platform: Platform) => {
										const store = platformStoreMap[platform.name];
										if (!store) return true;
										const website = game.websites?.find(
											(w: Website) =>
												w.category === store.category &&
												isValidStoreUrl(w.category, w.url),
										);
										return !website;
									}) && (
										<div className="text-muted-foreground text-sm">
											No store links available.
										</div>
									)}
							</div>
						)}
					</div>
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
