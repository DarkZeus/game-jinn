import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar.tsx";

interface MainLayoutProps {
	children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
	const { location } = useRouterState();
	const currentPath = location.pathname;

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
