import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Gamepad2,
	Trophy,
} from "lucide-react";

// Mock data for calendar events
const calendarEvents = [
	{
		id: 1,
		title: "The Witcher 3 Session",
		date: "2024-03-20",
		time: "19:00",
		duration: "2h",
		type: "gaming",
		game: "The Witcher 3",
		achievements: ["First Victory", "Speed Runner"],
	},
	{
		id: 2,
		title: "Achievement Hunt",
		date: "2024-03-22",
		time: "20:00",
		duration: "3h",
		type: "achievement",
		game: "Red Dead Redemption 2",
		achievements: ["Completionist"],
	},
	{
		id: 3,
		title: "Weekly Gaming Night",
		date: "2024-03-25",
		time: "18:00",
		duration: "4h",
		type: "gaming",
		game: "God of War",
		achievements: [],
	},
];

// Generate calendar days for March 2024
const generateCalendarDays = () => {
	const days = [];
	const firstDay = new Date(2024, 2, 1); // March 1, 2024
	const lastDay = new Date(2024, 2, 31); // March 31, 2024
	const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

	// Add empty cells for days before the first day of the month
	for (let i = 0; i < startingDay; i++) {
		days.push(null);
	}

	// Add days of the month
	for (let i = 1; i <= lastDay.getDate(); i++) {
		days.push(i);
	}

	return days;
};

export function CalendarPage() {
	const calendarDays = generateCalendarDays();

	return (
		<main className="space-y-8" aria-label="Calendar View">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
					<p className="text-muted-foreground mt-1">
						Track your gaming sessions and achievements
					</p>
				</div>
				<nav
					className="flex items-center gap-2"
					aria-label="Calendar Navigation"
				>
					<Button variant="outline" size="icon" aria-label="Previous Month">
						<ChevronLeft className="h-4 w-4" aria-hidden="true" />
					</Button>
					<Button variant="outline" size="icon" aria-label="Next Month">
						<ChevronRight className="h-4 w-4" aria-hidden="true" />
					</Button>
					<Button aria-label="Go to Today">Today</Button>
				</nav>
			</div>

			{/* Calendar Grid */}
			<table className="w-full" aria-label="March 2024 Calendar">
				<thead>
					<tr className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-muted-foreground">
						<th scope="col" className="text-center">
							Sun
						</th>
						<th scope="col" className="text-center">
							Mon
						</th>
						<th scope="col" className="text-center">
							Tue
						</th>
						<th scope="col" className="text-center">
							Wed
						</th>
						<th scope="col" className="text-center">
							Thu
						</th>
						<th scope="col" className="text-center">
							Fri
						</th>
						<th scope="col" className="text-center">
							Sat
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="grid grid-cols-7 gap-4">
						{calendarDays.map((day, index) => (
							<td
								key={`day-${index}-${day}`}
								className={cn(
									"aspect-square p-2",
									day === null && "opacity-50",
								)}
								aria-label={day ? `March ${day}, 2024` : "Empty day"}
								tabIndex={day ? 0 : -1}
							>
								<Card className="h-full">
									<div className="flex flex-col h-full">
										<div className="text-sm font-medium">{day}</div>
										<div className="flex-1 mt-2 space-y-1">
											{calendarEvents
												.filter(
													(event) => new Date(event.date).getDate() === day,
												)
												.map((event) => (
													<button
														type="button"
														key={event.id}
														className={cn(
															"w-full text-left text-xs p-1 rounded truncate",
															event.type === "gaming"
																? "bg-blue-500/10 text-blue-500"
																: "bg-purple-500/10 text-purple-500",
														)}
														aria-label={`${event.title} at ${event.time} for ${event.duration}`}
													>
														{event.time} - {event.title}
													</button>
												))}
										</div>
									</div>
								</Card>
							</td>
						))}
					</tr>
				</tbody>
			</table>

			{/* Upcoming Events */}
			<section aria-label="Upcoming Events">
				<h2 className="sr-only">Upcoming Events</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{calendarEvents.map((event) => (
						<article key={event.id}>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<div className="flex items-center gap-2">
										{event.type === "gaming" ? (
											<Gamepad2
												className="h-4 w-4 text-blue-500"
												aria-hidden="true"
											/>
										) : (
											<Trophy
												className="h-4 w-4 text-purple-500"
												aria-hidden="true"
											/>
										)}
										<h3 className="text-sm font-medium">{event.title}</h3>
									</div>
									<Button
										variant="ghost"
										size="icon"
										aria-label={`View details for ${event.title}`}
									>
										<CalendarIcon className="h-4 w-4" aria-hidden="true" />
									</Button>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-muted-foreground">Date</span>
											<span>{event.date}</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-muted-foreground">Time</span>
											<span>{event.time}</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-muted-foreground">Duration</span>
											<span>{event.duration}</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-muted-foreground">Game</span>
											<span>{event.game}</span>
										</div>
										{event.achievements.length > 0 && (
											<div className="pt-2">
												<p className="text-xs text-muted-foreground mb-1">
													Achievements
												</p>
												<ul className="space-y-1">
													{event.achievements.map((achievement) => (
														<li
															key={achievement}
															className="text-xs bg-muted px-2 py-1 rounded"
														>
															{achievement}
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}
