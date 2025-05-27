import type { GameWithTimeToBeat } from "@/lib/api/igdb.types";
import { isObject } from "@/lib/utils";
import {
	getResponsiveProgressiveImageUrls,
	normalizeIGDBUrl,
} from "@/lib/utils/image";
import { useLoaderData } from "@tanstack/react-router";

const getCoverImageUrl = (game: GameWithTimeToBeat): string | null => {
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

export const GameCover = () => {
	const { game } = useLoaderData({ from: "/games/$gameIdWithSlug" });
	const coverImageUrl = getCoverImageUrl(game);

	return (
		<div className="bg-muted rounded-lg overflow-hidden w-full aspect-[3/4] shadow-md mb-2">
			{coverImageUrl && (
				<img
					src={coverImageUrl}
					alt={game.name}
					className="object-cover w-full h-full"
				/>
			)}
		</div>
	);
};
