import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, Gamepad2, Star, TrendingUp, Trophy } from "lucide-react";
import logo from "../logo.svg";

export const Route = createFileRoute("/")({
	component: DashboardPage,
});

function App() {
	return (
		<div className="text-center">
			<header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
				<img
					src={logo}
					className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
					alt="logo"
				/>
				<p>
					Edit <code>src/routes/index.tsx</code> and save to reload.
				</p>
				<a
					className="text-[#61dafb] hover:underline"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<a
					className="text-[#61dafb] hover:underline"
					href="https://tanstack.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn TanStack
				</a>
			</header>
		</div>
	);
}

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">
					Welcome back, Player
				</h1>
				<p className="text-muted-foreground">
					Track your gaming progress and achievements
				</p>
			</div>

			{/* Stats Overview */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Games</CardTitle>
						<Gamepad2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Playtime
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">127h</div>
						<p className="text-xs text-muted-foreground">+12h this week</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Achievements</CardTitle>
						<Trophy className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">156</div>
						<p className="text-xs text-muted-foreground">68% completion rate</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Favorite Games
						</CardTitle>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">8</div>
						<p className="text-xs text-muted-foreground">
							Most played category
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div key={i} className="flex items-center gap-4">
									<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
										<Award className="h-5 w-5" />
									</div>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">
											Unlocked "Master Explorer" achievement
										</p>
										<p className="text-sm text-muted-foreground">
											In Elden Ring • 2 hours ago
										</p>
									</div>
									<Badge variant="secondary">Achievement</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Progress Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Elden Ring</span>
									<span className="text-sm text-muted-foreground">75%</span>
								</div>
								<Progress value={75} className="h-2" />
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">
										God of War Ragnarök
									</span>
									<span className="text-sm text-muted-foreground">92%</span>
								</div>
								<Progress value={92} className="h-2" />
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Baldur's Gate 3</span>
									<span className="text-sm text-muted-foreground">45%</span>
								</div>
								<Progress value={45} className="h-2" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
