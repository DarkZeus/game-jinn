import { Button } from "@/components/ui/button";
import type { Platform, Website } from "@/lib/api/igdb.types";
import { useLoaderData } from "@tanstack/react-router";

// Map platform names to store categories and display names
const platformStoreMap: Record<
	string,
	{ category: number; displayName: string }
> = {
	"PC (Microsoft Windows)": { category: 13, displayName: "Steam" },
	"PlayStation 5": { category: 23, displayName: "PlayStation Store" },
	"PlayStation 4": { category: 23, displayName: "PlayStation Store" },
	"Xbox Series X|S": { category: 21, displayName: "Xbox Store" },
	"Xbox One": { category: 21, displayName: "Xbox Store" },
	"Nintendo Switch": { category: 22, displayName: "Nintendo eShop" },
	iOS: { category: 18, displayName: "App Store" },
	Android: { category: 17, displayName: "Google Play" },
	Mac: { category: 13, displayName: "Steam" },
	Linux: { category: 13, displayName: "Steam" },
};

// Validate store URLs by category
function isValidStoreUrl(category: number, url: string) {
	switch (category) {
		case 13:
			return url.includes("steampowered.com/app/");
		case 14:
			return url.includes("gog.com/game/");
		case 16:
			return url.includes("epicgames.com/store/");
		case 15:
			return url.includes("itch.io/");
		case 17:
			return url.includes("play.google.com/store/");
		case 18:
			return url.includes("apps.apple.com/");
		case 20:
		case 23:
			return url.includes("store.playstation.com/");
		case 21:
			return url.includes("xbox.com/");
		case 22:
			return url.includes("nintendo.com/games/detail/");
		default:
			return false;
	}
}

/**
 * GameStoreLinks renders store buttons for each platform with a valid store link.
 * Uses router context for game data.
 */
export const GameStoreLinks = () => {
	const { game } = useLoaderData({ from: "/games/$gameId-$gameSlug" });

	return (
		<div className="w-full bg-muted/40 rounded-lg p-4">
			<h4 className="font-semibold mb-2">Where to buy</h4>
			{game.websites && (
				<div className="flex flex-col gap-2">
					{/* Store Buttons */}
					{game.platforms &&
						game.websites &&
						game.platforms.map((platform: Platform) => {
							const store = platformStoreMap[platform.name];
							if (!store) return null;
							const website = game.websites?.find(
								(w: Website) =>
									w.category === store.category &&
									isValidStoreUrl(w.category, w.url),
							);
							if (!website) return null;
							return (
								<Button
									asChild
									variant="secondary"
									size="sm"
									className="w-full"
									key={platform.id}
								>
									<a
										href={website.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{store.displayName} ({platform.name})
									</a>
								</Button>
							);
						})}
					{/* Fallback if no store links */}
					{game.platforms &&
						game.websites &&
						game.platforms.every((platform: Platform) => {
							const store = platformStoreMap[platform.name];
							if (!store) return true;
							const website = game.websites?.find(
								(w: Website) =>
									w.category === store.category &&
									isValidStoreUrl(w.category, w.url),
							);
							return !website;
						}) && (
							<div className="text-muted-foreground text-sm">
								No store links available.
							</div>
						)}
				</div>
			)}
		</div>
	);
};
