import { ProgressPage } from "@/pages/progress";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/progress")({
	component: ProgressPage,
});
