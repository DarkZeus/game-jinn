import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Game } from "@/lib/api/igdb.types";
import { isObject } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

// Props type for the GameGrid component
export type GameGridProps = {
	games: Game[];
	isLoading: boolean;
};

/**
 * GameGrid displays a grid of game cards or a loading state.
 * - Follows project code style: types, early returns, no else, functional style.
 */
export const GameGrid = ({ games, isLoading }: GameGridProps) => {
	if (isLoading) {
		return (
			<div className="text-center py-12 text-muted-foreground">
				Loading games...
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{games.map((game) => (
				<Link
					key={game.id}
					to="/games/$gameId-$gameSlug"
					params={{
						"gameId-$gameSlug": `${game.id}-${game.slug}`,
					}}
					className="block"
					viewTransition
				>
					<Card className="overflow-hidden hover:shadow-md transition-shadow">
						<div className="aspect-video bg-muted relative">
							{game.cover && isObject(game.cover) && (
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
							{/* Screenshot preview */}
							{game.screenshots &&
								isObject(game.screenshots) &&
								game.screenshots.length > 0 && (
									<img
										src={
											game.screenshots[0].url.startsWith("//")
												? `https:${game.screenshots[0].url}`
												: game.screenshots[0].url
										}
										alt={`${game.name} screenshot preview`}
										className="absolute bottom-2 left-2 w-16 h-10 object-cover rounded shadow-md border border-white"
									/>
								)}
							<div className="absolute top-2 right-2">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Star className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<CardHeader className="p-4">
							<CardTitle className="text-lg">{game.name}</CardTitle>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{game.platforms?.[0]?.name || "Unknown Platform"}</span>
								<span>•</span>
								<span>{game.genres?.[0]?.name || "Unknown Genre"}</span>
							</div>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	);
};
