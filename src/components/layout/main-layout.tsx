import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
	BarChart3,
	Calendar,
	FileText,
	Gamepad2,
	LayoutDashboard,
	LineChart,
	Settings,
	Star,
	Trophy,
} from "lucide-react";
import type { ReactNode } from "react";

interface MainLayoutProps {
	children: ReactNode;
}

const navItems = [
	{ icon: LayoutDashboard, label: "Dashboard", href: "/" },
	{ icon: Gamepad2, label: "Games", href: "/games" },
	{ icon: Trophy, label: "Achievements", href: "/achievements" },
	{ icon: Star, label: "Favorites", href: "/favorites" },
	{ icon: BarChart3, label: "Progress", href: "/progress" },
	{ icon: Calendar, label: "Calendar", href: "/calendar" },
	{ icon: LineChart, label: "Statistics", href: "/statistics" },
	{ icon: FileText, label: "Notes", href: "/notes" },
	{ icon: Settings, label: "Settings", href: "/settings" },
];

export function MainLayout({ children }: MainLayoutProps) {
	const { location } = useRouterState();
	const currentPath = location.pathname;

	return (
		<SidebarProvider defaultOpen>
			<div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A]">
				{/* Top Navigation Bar */}
				<header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b z-50">
					<div className="h-full px-8 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Gamepad2 className="w-6 h-6 text-blue-600" />
							<span className="text-xl font-semibold tracking-tight">
								GameJinn
							</span>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="ghost" size="sm" className="h-9 w-9 p-0">
								<Avatar className="h-8 w-8" />
							</Button>
						</div>
					</div>
				</header>

				{/* Sidebar */}
				<Sidebar className="fixed left-0 top-16 bottom-0 border-r bg-white/80 backdrop-blur-sm">
					<SidebarContent className="px-2">
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										isActive={currentPath === item.href}
										className="h-10 text-[15px] font-medium"
									>
										<Link to={item.href} className="w-full justify-start gap-3">
											<item.icon className="w-4 h-4" />
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarContent>
				</Sidebar>

				{/* Main Content */}
				<main className="fixed inset-0 pl-64 pt-16 overflow-auto">
					<div className="h-full p-8">{children}</div>
				</main>
			</div>
		</SidebarProvider>
	);
}
