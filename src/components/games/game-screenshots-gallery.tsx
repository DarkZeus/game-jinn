import type { Screenshot } from "@/lib/api/igdb.types";
import { getScreenshotUrls, normalizeIGDBUrl } from "@/lib/utils/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLoaderData } from "@tanstack/react-router";
import { useState } from "react";
import { OptimizedImage } from "../ui/optimized-image";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { GameImage } from "./game-image";

/**
 * GameScreenshotsGallery renders a horizontal row of screenshots with dialogs for full view.
 * Uses router context for game data.
 */
export const GameScreenshotsGallery = () => {
	const { game } = useLoaderData({ from: "/games/$gameId-$gameSlug" });
	const images: Screenshot[] =
		Array.from([...(game.screenshots || []), ...(game.artworks || [])]) || [];

	if (images.length === 0) return null;

	// Get screenshot URLs for thumbnail and full resolution
	const getScreenshotImageUrls = (shot: Screenshot) => {
		if (shot.image_id) {
			const screenshotUrls = getScreenshotUrls(shot.image_id);
			return {
				thumbnail: screenshotUrls.medium, // Use medium for thumbnails
				thumbnailThumb: screenshotUrls.thumb, // Use thumb for progressive loading
				fullRes: screenshotUrls.fullRes, // Use full resolution for modal
				fullResThumb: screenshotUrls.large, // Use large as thumb for modal
			};
		}

		// Fallback for legacy URLs
		const normalizedUrl = normalizeIGDBUrl(shot.url);
		return {
			thumbnail: normalizedUrl,
			thumbnailThumb: normalizedUrl,
			fullRes: normalizedUrl,
			fullResThumb: normalizedUrl,
		};
	};

	return (
		<div className="w-full">
			<h4 className="font-semibold mb-2 opacity-50">Screenshots</h4>
			<div className="flex gap-2 w-full overflow-x-auto pb-2">
				{images.map((shot: Screenshot, idx: number) => {
					const imageUrls = getScreenshotImageUrls(shot);
					const [isOpen, setIsOpen] = useState(false);

					return (
						<Sheet key={shot.id} open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<div className="cursor-pointer hover:brightness-90 transition">
									<OptimizedImage
										src={imageUrls.thumbnail}
										thumbSrc={imageUrls.thumbnailThumb}
										alt={`${game.name} screenshot`}
										className="rounded-lg object-cover h-24 w-auto min-w-[120px]"
									/>
								</div>
							</SheetTrigger>
							<SheetContent
								className="flex flex-col items-center justify-center max-w-[100dvw] max-h-[100dvh]"
								side="fade"
								onOpenChange={setIsOpen}
							>
								<VisuallyHidden>
									<SheetHeader>
										<SheetTitle>{game.name}</SheetTitle>
										<SheetDescription>
											{`${game.name} screenshot` || "Screenshot"}
										</SheetDescription>
									</SheetHeader>
								</VisuallyHidden>
								<OptimizedImage
									src={imageUrls.fullRes}
									thumbSrc={imageUrls.fullResThumb}
									alt={`${game.name} screenshot`}
									className="max-w-[90dvw] max-h-[90dvh] object-cover rounded-lg"
									priority={true}
								/>
							</SheetContent>
						</Sheet>
					);
				})}
			</div>
		</div>
	);
};
