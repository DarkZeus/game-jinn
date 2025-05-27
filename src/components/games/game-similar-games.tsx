import type { SimilarGame } from "@/lib/api/igdb.types";

type SimilarGamesProps = {
	games: SimilarGame[];
};

export const SimilarGames = ({ games }: SimilarGamesProps) => {
	if (games.length === 0) return null;

	return (
		<div className="mt-8">
			<h2 className="text-lg font-semibold mb-2">Similar Games</h2>
			<div className="flex flex-wrap gap-3">
				{games.map((sg: SimilarGame) => (
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
	);
};
