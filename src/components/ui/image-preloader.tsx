import type { Game } from "@/lib/api/igdb.types";
import { isObject } from "@/lib/utils";
import { getResponsiveProgressiveImageUrls } from "@/lib/utils/image";
import { useEffect } from "react";

type ImagePreloaderProps = {
	games: Game[];
	count?: number;
};

/**
 * ImagePreloader component that preloads critical game images.
 * Uses link preload to hint browsers about critical resources.
 * Now uses responsive image sizing for optimal quality on all displays.
 */
export const ImagePreloader = ({ games, count = 4 }: ImagePreloaderProps) => {
	useEffect(() => {
		const criticalGames = games.slice(0, count);

		for (const game of criticalGames) {
			if (!game.cover || !isObject(game.cover) || !game.cover.image_id) {
				continue;
			}

			const imageUrls = getResponsiveProgressiveImageUrls(game.cover.image_id);

			// Preload both thumb and full images for critical games
			for (const url of [imageUrls.thumb, imageUrls.full]) {
				const link = document.createElement("link");
				link.rel = "preload";
				link.href = url;
				link.as = "image";
				link.type = "image/webp";

				// Only add if not already present
				const existing = document.querySelector(`link[href="${url}"]`);
				if (!existing) {
					document.head.appendChild(link);
				}
			}
		}

		// Cleanup function to remove preload links when component unmounts
		return () => {
			const preloadLinks = document.querySelectorAll(
				'link[rel="preload"][as="image"]',
			);
			for (const link of preloadLinks) {
				// Only remove links we added (IGDB images)
				if (link.getAttribute("href")?.includes("images.igdb.com")) {
					link.remove();
				}
			}
		};
	}, [games, count]);

	return null; // This component doesn't render anything
};
