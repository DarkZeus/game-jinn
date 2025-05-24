import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { Screenshot } from "@/lib/api/igdb.types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLoaderData } from "@tanstack/react-router";

/**
 * GameScreenshotsGallery renders a horizontal row of screenshots with dialogs for full view.
 * Uses router context for game data.
 */
export const GameScreenshotsGallery = () => {
	const { game } = useLoaderData({ from: "/games/$gameId-$gameSlug" });
	const screenshots: Screenshot[] = game.screenshots || [];

	if (screenshots.length === 0) return null;

	return (
		<div className="flex gap-2 w-full overflow-x-auto pb-2">
			{screenshots.map((shot: Screenshot, idx: number) => (
				<Dialog key={shot.id}>
					<DialogTrigger asChild>
						<img
							src={
								shot.image_id
									? `//images.igdb.com/igdb/image/upload/t_720p/${shot.image_id}.webp`
									: shot.url.startsWith("//")
										? `https:${shot.url}`
										: shot.url
							}
							alt={`${game.name} screenshot`}
							className="rounded-lg object-cover h-24 w-auto min-w-[120px] cursor-pointer hover:brightness-90 transition"
						/>
					</DialogTrigger>
					<DialogContent className="min-w-[90svw] grid-rows-[auto_minmax(0,1fr)_auto] px-0 py-0 h-[90svh]">
						<VisuallyHidden>
							<DialogHeader className="p-6 pb-0">
								<DialogTitle>{game.name}</DialogTitle>
								<DialogDescription>
									Screenshot {idx + 1} of {screenshots.length}
								</DialogDescription>
							</DialogHeader>
						</VisuallyHidden>
						<div className="grid gap-4 py-4 overflow-y-auto h-dvh items-center">
							<div className="flex flex-col justify-between items-center">
								<img
									src={
										shot.image_id
											? `//images.igdb.com/igdb/image/upload/t_1080p_2x/${shot.image_id}.webp`
											: shot.url.startsWith("//")
												? `https:${shot.url}`
												: shot.url
									}
									alt={`${game.name} screenshot`}
									className="rounded-lg object-cover"
								/>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			))}
		</div>
	);
};
