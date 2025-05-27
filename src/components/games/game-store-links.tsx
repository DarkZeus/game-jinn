import { Button } from "@/components/ui/button";
import type { Platform, Website } from "@/lib/api/igdb.types";
import { STORE_CONFIG } from "@/lib/constants/stores";
import { getWebsiteCategory, isValidStoreUrl } from "@/lib/utils/stores";
import { useLoaderData } from "@tanstack/react-router";

/**
 * GameStoreLinks renders store buttons for available store websites.
 * Handles both category-based and type-based website data formats.
 */
export const GameStoreLinks = () => {
	const { game } = useLoaderData({ from: "/games/$gameIdWithSlug" });

	if (!game.websites) {
		return (
			<div className="w-full">
				<h4 className="font-semibold mb-2 opacity-50">Where to buy</h4>
				<div className="text-muted-foreground text-sm">
					No store links available.
				</div>
			</div>
		);
	}

	const storeLinks = game.websites
		.map((website: Website) => {
			const category = getWebsiteCategory(website);
			if (!category) return null;

			const storeConfig = STORE_CONFIG[category as keyof typeof STORE_CONFIG];
			if (!storeConfig || !isValidStoreUrl(category, website.url)) return null;

			return {
				key: `${category}-${website.id || website.url}`,
				url: website.url,
				label: storeConfig.displayName,
				category,
			};
		})
		.filter((link): link is NonNullable<typeof link> => link !== null)
		.sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

	return (
		<div className="w-full">
			<h4 className="font-semibold mb-2 opacity-50">Where to buy</h4>
			<div className="flex flex-col gap-2">
				{storeLinks.length > 0 ? (
					storeLinks.map((link) => (
						<Button
							asChild
							variant="secondary"
							size="sm"
							className="w-full"
							key={link.key}
						>
							<a href={link.url} target="_blank" rel="noopener noreferrer">
								{link.label}
							</a>
						</Button>
					))
				) : (
					<div className="text-muted-foreground text-sm">
						No store links available.
					</div>
				)}
			</div>
		</div>
	);
};
