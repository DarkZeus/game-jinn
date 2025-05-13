import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Tag } from "lucide-react";

// Mock data for notes
const notes = [
	{
		id: 1,
		title: "The Witcher 3 - Best Build",
		content:
			"Focus on alchemy and combat skills. Use the Euphoria mutation for maximum damage output.",
		game: "The Witcher 3",
		tags: ["build", "strategy"],
		date: "2024-03-15",
	},
	{
		id: 2,
		title: "RDR2 - Money Making Guide",
		content:
			"Best locations for hunting and fishing. Complete the treasure maps early for quick cash.",
		game: "Red Dead Redemption 2",
		tags: ["money", "guide"],
		date: "2024-03-10",
	},
	{
		id: 3,
		title: "God of War - Valkyrie Tips",
		content:
			"Use the Blades of Chaos for range. Dodge and parry timing is crucial for all Valkyrie fights.",
		game: "God of War",
		tags: ["boss", "tips"],
		date: "2024-03-05",
	},
];

export function NotesPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
					<p className="text-muted-foreground mt-1">
						Keep track of your gaming strategies and tips
					</p>
				</div>
				<Button>
					<Plus className="h-4 w-4 mr-2" />
					New Note
				</Button>
			</div>

			{/* Search and Filter */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search notes..." className="pl-8" />
				</div>
				<Select defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by game" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Games</SelectItem>
						<SelectItem value="witcher3">The Witcher 3</SelectItem>
						<SelectItem value="rdr2">Red Dead Redemption 2</SelectItem>
						<SelectItem value="gow">God of War</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Notes Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{notes.map((note) => (
					<Card key={note.id} className="group">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<div>
								<h3 className="text-sm font-medium">{note.title}</h3>
								<p className="text-xs text-muted-foreground">{note.game}</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<Plus className="h-4 w-4" />
							</Button>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground line-clamp-3">
								{note.content}
							</p>
							<div className="flex items-center gap-2 mt-4">
								{note.tags.map((tag) => (
									<span
										key={tag}
										className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									>
										<Tag className="mr-1 h-3 w-3" />
										{tag}
									</span>
								))}
							</div>
						</CardContent>
					</Card>
				))}

				{/* New Note Card */}
				<Card className="border-dashed">
					<CardContent className="flex flex-col items-center justify-center h-[200px]">
						<Button variant="ghost" className="h-20 w-20 rounded-full">
							<Plus className="h-8 w-8" />
						</Button>
						<p className="text-sm text-muted-foreground mt-2">
							Create new note
						</p>
					</CardContent>
				</Card>
			</div>

			{/* New Note Form (Hidden by default) */}
			<Card className="hidden">
				<CardHeader>
					<h3 className="text-lg font-medium">New Note</h3>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<label
								htmlFor="title"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Title
							</label>
							<Input id="title" placeholder="Enter note title" />
						</div>
						<div className="space-y-2">
							<label
								htmlFor="game"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Game
							</label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select game" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="witcher3">The Witcher 3</SelectItem>
									<SelectItem value="rdr2">Red Dead Redemption 2</SelectItem>
									<SelectItem value="gow">God of War</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="content"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Content
							</label>
							<Textarea
								id="content"
								placeholder="Enter your note content"
								className="min-h-[200px]"
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="tags"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Tags
							</label>
							<Input id="tags" placeholder="Enter tags (comma separated)" />
						</div>
						<div className="flex justify-end gap-2">
							<Button variant="outline">Cancel</Button>
							<Button>Save Note</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
