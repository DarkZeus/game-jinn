type GameEmptyStateProps = {
	searchTerm: string;
};

/**
 * GameEmptyState component displayed when no games are found for a search query.
 */
export const GameEmptyState = ({ searchTerm }: GameEmptyStateProps) => {
	return (
		<div className="text-center py-12">
			<div className="text-muted-foreground mb-2">
				No games found for "{searchTerm}"
			</div>
			<div className="text-sm text-muted-foreground">
				Try adjusting your search terms or browse our most anticipated games
			</div>
		</div>
	);
};
