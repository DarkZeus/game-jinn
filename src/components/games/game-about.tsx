import { useLoaderData } from "@tanstack/react-router";

export const GameAbout = () => {
	const { game } = useLoaderData({ from: "/games/$gameIdWithSlug" });

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">About</h2>
			<p className="text-muted-foreground">
				{game.summary || "No description available."}
			</p>
		</div>
	);
};
