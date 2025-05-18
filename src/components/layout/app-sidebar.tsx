import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, LayoutDashboard } from "lucide-react";

const navItems = [
	{ icon: LayoutDashboard, label: "Dashboard", href: "/" },
	{ icon: Gamepad2, label: "Games", href: "/games" },
	// { icon: Trophy, label: "Achievements", href: "/achievements" },
	// { icon: Star, label: "Favorites", href: "/favorites" },
	// { icon: BarChart3, label: "Progress", href: "/progress" },
	// { icon: Calendar, label: "Calendar", href: "/calendar" },
	// { icon: LineChart, label: "Statistics", href: "/statistics" },
	// { icon: FileText, label: "Notes", href: "/notes" },
	// { icon: Settings, label: "Settings", href: "/settings" },
];

export function AppSidebar() {
	const { location } = useRouterState();
	const currentPath = location.pathname;

	return (
		<Sidebar variant="inset">
			<SidebarContent>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Gamepad2 className="size-4" />
								</div>
								<div className="grid flex-1 text-left leading-tight">
									<span className="truncate font-semibold texg-lg">
										GameJinn
									</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton
										asChild
										isActive={currentPath === item.href}
									>
										<Link to={item.href} viewTransition>
											<item.icon />
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
