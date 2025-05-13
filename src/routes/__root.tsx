import { MainLayout } from "@/components/layout/main-layout";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<MainLayout>
			<Outlet />
			<TanStackRouterDevtools />
			<TanStackQueryLayout />
		</MainLayout>
	),
});
