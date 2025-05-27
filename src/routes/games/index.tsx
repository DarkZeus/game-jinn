import { mostAnticipatedGamesQueryOptions } from "@/actions/gamesQueryOptions";
import { SearchableGameGrid } from "@/components/games/game-grid";
import { GamesSkeleton } from "@/components/games/skeleton";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Grid, List } from "lucide-react";

export const Route = createFileRoute("/games/")({
	loader: async ({ context: { queryClient } }) =>
		await queryClient.ensureQueryData(mostAnticipatedGamesQueryOptions),
	pendingMinMs: 1,
	pendingMs: 1,
	component: GamesPage,
	pendingComponent: () => <GamesSkeleton withHeader />,
});

function GamesPage() {
	return (
		<div className="p-4">
			<div className="space-y-6 px-4 md:px-12 py-8">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<h1 className="text-3xl font-bold tracking-tight">Games Library</h1>
						<p className="text-muted-foreground">
							Browse and manage your game collection
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="icon">
							<Grid className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="icon">
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Search and Games Grid (now combined) */}
				<SearchableGameGrid />
			</div>
		</div>
	);
}
