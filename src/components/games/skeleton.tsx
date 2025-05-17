import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function GamesSkeleton() {
	return (
		<div className="space-y-6">
			{/* Header Skeleton */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<Skeleton className="h-9 w-[200px]" />
					<Skeleton className="h-4 w-[300px]" />
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-9 w-9" />
					<Skeleton className="h-9 w-9" />
				</div>
			</div>

			{/* Filters Skeleton */}
			<div className="flex items-center gap-4">
				<Skeleton className="h-10 flex-1" />
				<Skeleton className="h-10 w-[180px]" />
				<Skeleton className="h-10 w-[180px]" />
				<Skeleton className="h-10 w-10" />
			</div>

			{/* Games Grid Skeleton */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<Card key={`skeleton-${i}`} className="overflow-hidden">
						<Skeleton className="aspect-video w-full" />
						<CardHeader className="p-4">
							<Skeleton className="h-6 w-3/4" />
							<Skeleton className="h-4 w-1/2 mt-2" />
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-2 w-full" />
								<div className="flex items-center justify-between">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
