import { Badge } from "@/components/ui/badge";
import type {
	AlternativeName,
	Franchise,
	GameEngine,
	GameMode,
	Genre,
	InvolvedCompany,
	Keyword,
	Platform,
	PlayerPerspective,
	Website,
} from "@/lib/api/igdb.types";
import { useLoaderData } from "@tanstack/react-router";

/**
 * GameInfoGrid displays detailed info about a game in a grid layout.
 * Uses router context for data (no prop drilling).
 */
export const GameInfoGrid = () => {
	const { game } = useLoaderData({ from: "/games/$gameId-$gameSlug" });

	return (
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
	);
};
