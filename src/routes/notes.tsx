import { NotesPage } from "@/pages/notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes")({
	component: NotesPage,
});
