import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

/**
 * SearchInput component for game search functionality.
 * Uses URL search params for state management.
 */
export const GameSearchInput = () => {
	const [search, setSearch] = useQueryState(
		"search",
		parseAsString.withDefault(""),
	);

	return (
		<div className="relative flex-1">
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search games..."
				className="pl-8"
				value={search}
				onChange={(e) => setSearch(e.target.value || null)}
			/>
		</div>
	);
};
