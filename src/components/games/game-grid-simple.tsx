import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Game } from "@/lib/api/igdb.types";
import { Link } from "@tanstack/react-router";
import { GameImage } from "./game-image";
import { GamesSkeleton } from "./skeleton";

export type GameGridProps = {
	games: Game[];
	isLoading: boolean;
};

/**
 * Simple GameGrid component for displaying a list of games without search functionality.
 * Used for backward compatibility or when you have games data already.
 */
export const GameGrid = ({ games, isLoading }: GameGridProps) => {
	if (isLoading) {
		return <GamesSkeleton />;
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{games.map((game, index) => (
				<Link
					key={game.id}
					to="/games/$gameIdWithSlug"
					params={{
						gameIdWithSlug: `${game.id}-${game.slug}`,
					}}
					className="block"
					viewTransition
				>
					<Card className="overflow-hidden hover:shadow-md transition-shadow p-0">
						<GameImage
							game={game}
							className="aspect-[4/5] w-full bg-muted"
							priority={index < 4}
							showScreenshotPreview={true}
						/>
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
