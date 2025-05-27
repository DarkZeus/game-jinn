import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Game } from "@/lib/api/igdb.types";
import { formatReleaseDate } from "@/lib/utils/date";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { GameImage } from "./game-image";

type GameCardProps = {
	game: Game;
	index: number;
};

/**
 * GameCard component with hover effects and detailed game information overlay.
 * Displays game cover, title, platform, genre, release date, rating, and additional info on hover.
 */
export const GameCard = ({ game, index }: GameCardProps) => {
	return (
		<Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 p-0 relative bg-gradient-to-b from-neutral-900 to-black">
			<Link
				to="/games/$gameIdWithSlug"
				params={{
					gameIdWithSlug: `${game.id}-${game.slug}`,
				}}
				className="block h-full"
				viewTransition
			>
				<div className="relative">
					<GameImage
						game={game}
						className="aspect-[3/4] w-full object-cover"
						priority={index < 4}
						showScreenshotPreview={true}
					/>
					{/* Gradient overlay for better text readability */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

					{/* Star button */}
					<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
						<Button
							variant="secondary"
							size="icon"
							className="h-8 w-8 bg-black/50 hover:bg-black/70 border-none"
						>
							<Star className="h-4 w-4 text-yellow-400" />
						</Button>
					</div>

					{/* Game info overlay */}
					<div className="absolute bottom-0 left-0 right-0 p-4">
						<h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors duration-200">
							{game.name}
						</h3>

						{/* Additional info - positioned absolutely to not affect title position */}
						<div className="absolute bottom-full left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
							{/* Basic info */}
							<div className="flex items-center gap-2 text-sm text-neutral-300 mb-3">
								<span className="px-2 py-1 bg-neutral-800/80 rounded text-xs font-medium">
									{game.platforms?.[0]?.name || "PC"}
								</span>
								<span className="text-neutral-500">•</span>
								<span>{game.genres?.[0]?.name || "Action"}</span>
							</div>

							{/* Detailed info */}
							<div className="space-y-2">
								<div className="flex items-center gap-3 text-xs text-neutral-400">
									{game.first_release_date && (
										<div className="flex items-center gap-1">
											<span className="text-neutral-500">Release:</span>
											<span className="text-white font-medium">
												{formatReleaseDate(game.first_release_date, "uk-UA")}
											</span>
										</div>
									)}
									{game.rating && (
										<div className="flex items-center gap-1">
											<span className="text-neutral-500">Rating:</span>
											<span className="text-green-400 font-medium">
												{Math.round(game.rating)}%
											</span>
										</div>
									)}
								</div>

								{game.genres && game.genres.length > 1 && (
									<div className="flex flex-wrap gap-1">
										{game.genres.slice(0, 3).map((genre) => (
											<span
												key={genre.id}
												className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs border border-blue-600/30"
											>
												{genre.name}
											</span>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</Card>
	);
};
