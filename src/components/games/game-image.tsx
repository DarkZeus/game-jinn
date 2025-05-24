import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Game } from "@/lib/api/igdb.types";
import { isObject } from "@/lib/utils";
import { getProgressiveImageUrls, normalizeIGDBUrl } from "@/lib/utils/image";
import type { ReactNode } from "react";

type GameImageProps = {
	game: Game;
	className?: string;
	priority?: boolean;
	showScreenshotPreview?: boolean;
	children?: ReactNode;
};

/**
 * GameImage component optimized for IGDB game cover images.
 * Handles different IGDB URL formats and implements progressive loading.
 */
export const GameImage = ({
	game,
	className,
	priority = false,
	showScreenshotPreview = true,
	children,
}: GameImageProps) => {
	// Handle game cover image
	const getCoverImageUrls = () => {
		if (!game.cover || !isObject(game.cover)) {
			return null;
		}

		// New IGDB format with image_id
		if (game.cover.image_id) {
			return getProgressiveImageUrls(game.cover.image_id);
		}

		// Legacy format with direct URL
		if (game.cover.url) {
			const normalizedUrl = normalizeIGDBUrl(game.cover.url);
			return {
				full: normalizedUrl,
				thumb: normalizedUrl, // No thumb available for legacy URLs
			};
		}

		return null;
	};

	const imageUrls = getCoverImageUrls();

	if (!imageUrls) {
		return (
			<div className={className}>
				<div className="w-full h-full bg-muted flex items-center justify-center">
					<span className="text-muted-foreground text-sm">No image</span>
				</div>
				{children}
			</div>
		);
	}

	return (
		<div className="relative">
			<OptimizedImage
				src={imageUrls.full}
				thumbSrc={imageUrls.thumb}
				alt={game.name}
				className={className}
				priority={priority}
			/>

			{/* Screenshot preview overlay */}
			{showScreenshotPreview &&
				game.screenshots &&
				isObject(game.screenshots) &&
				game.screenshots.length > 0 && (
					<div className="absolute bottom-2 left-2">
						<OptimizedImage
							src={normalizeIGDBUrl(game.screenshots[0].url)}
							alt={`${game.name} screenshot preview`}
							className="w-16 h-10 rounded shadow-md border border-white"
						/>
					</div>
				)}

			{/* Additional overlays (like buttons) */}
			{children}
		</div>
	);
};
