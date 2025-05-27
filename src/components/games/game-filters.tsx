import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

/**
 * GameFilters component for platform and status filtering.
 * Currently uses placeholder functionality - can be enhanced with actual filtering logic.
 */
export const GameFilters = () => {
	return (
		<>
			<Select defaultValue="all">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Platform" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Platforms</SelectItem>
					<SelectItem value="pc">PC</SelectItem>
					<SelectItem value="ps5">PlayStation 5</SelectItem>
					<SelectItem value="xbox">Xbox Series X</SelectItem>
					<SelectItem value="switch">Nintendo Switch</SelectItem>
				</SelectContent>
			</Select>
			<Select defaultValue="all">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Status</SelectItem>
					<SelectItem value="playing">Currently Playing</SelectItem>
					<SelectItem value="completed">Completed</SelectItem>
					<SelectItem value="backlog">Backlog</SelectItem>
				</SelectContent>
			</Select>
			<Button variant="outline" size="icon">
				<Filter className="h-4 w-4" />
			</Button>
		</>
	);
};
