import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Filter, Grid, List, Search, Star, Trophy } from "lucide-react";

export const Route = createFileRoute("/games")({
	component: GamesPage,
});

function GamesPage() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold tracking-tight">Games Library</h1>
					<p className="text-muted-foreground">
						Browse and manage your game collection
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon">
						<Grid className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon">
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input type="search" placeholder="Search games..." className="pl-8" />
				</div>
				<Select defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Platform" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Platforms</SelectItem>
						<SelectItem value="pc">PC</SelectItem>
						<SelectItem value="ps5">PlayStation 5</SelectItem>
						<SelectItem value="xbox">Xbox Series X</SelectItem>
						<SelectItem value="switch">Nintendo Switch</SelectItem>
					</SelectContent>
				</Select>
				<Select defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="playing">Currently Playing</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
						<SelectItem value="backlog">Backlog</SelectItem>
					</SelectContent>
				</Select>
				<Button variant="outline" size="icon">
					<Filter className="h-4 w-4" />
				</Button>
			</div>

			{/* Games Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
					<Card key={i} className="overflow-hidden">
						<div className="aspect-video bg-muted relative">
							<div className="absolute top-2 right-2">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Star className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<CardHeader className="p-4">
							<CardTitle className="text-lg">Game Title {i}</CardTitle>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>PlayStation 5</span>
								<span>•</span>
								<span>Action RPG</span>
							</div>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Progress</span>
									<span className="font-medium">75%</span>
								</div>
								<Progress value={75} className="h-2" />
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-2">
										<Trophy className="h-4 w-4 text-muted-foreground" />
										<span>24/30</span>
									</div>
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4 text-muted-foreground" />
										<span>45h</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
