import { MainLayout } from "@/components/layout/main-layout";
import TanStackQueryLayout from "@/integrations/tanstack-query/layout";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<MainLayout>
			<Outlet />
			{/* <TanStackRouterDevtools /> */}
			<TanStackQueryLayout />
		</MainLayout>
	),
});
