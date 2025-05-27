import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoaderData } from "@tanstack/react-router";
import { GameAchievements } from "./game-achievements";
import { GameInfoGrid } from "./game-info-grid";
import { SimilarGames } from "./game-similar-games";
import { GameVideos } from "./game-videos";

/**
 * GameDetailsTabs component provides tabbed interface for game information.
 * Contains Description tab (with info grid, similar games, videos) and Achievements tab.
 */
export const GameDetailsTabs = () => {
	const { game } = useLoaderData({ from: "/games/$gameIdWithSlug" });

	return (
		<Tabs defaultValue="description" className="w-full">
			<TabsList className="grid w-full grid-cols-2 mb-6">
				<TabsTrigger
					value="description"
					className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
				>
					Description
				</TabsTrigger>
				<TabsTrigger
					value="achievements"
					className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
				>
					Achievements
				</TabsTrigger>
			</TabsList>

			<TabsContent value="description" className="space-y-8">
				<GameInfoGrid />
				<SimilarGames games={game.similar_games || []} />
				<GameVideos videos={game.videos || []} />
			</TabsContent>

			<TabsContent value="achievements">
				<GameAchievements gameTitle={game.name} />
			</TabsContent>
		</Tabs>
	);
};
