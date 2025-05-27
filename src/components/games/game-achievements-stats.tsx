import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Users } from "lucide-react";

type AchievementStatsProps = {
	unlockedCount: number;
	totalCount: number;
	completionPercentage: number;
	avgGlobalCompletion: number;
};

export const AchievementStats = ({
	unlockedCount,
	totalCount,
	completionPercentage,
	avgGlobalCompletion,
}: AchievementStatsProps) => {
	return (
		<div className="space-y-6">
			{/* Achievement Stats Header */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-500/20 rounded-lg">
							<Trophy className="h-5 w-5 text-blue-400" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Achievements</p>
							<p className="text-2xl font-bold text-blue-400">
								{unlockedCount} of {totalCount}
							</p>
						</div>
					</div>
				</Card>

				<Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-green-500/20 rounded-lg">
							<Users className="h-5 w-5 text-green-400" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Avg. Global Rate</p>
							<p className="text-2xl font-bold text-green-400">
								{unlockedCount > 0 ? avgGlobalCompletion.toFixed(1) : "0.0"}%
							</p>
						</div>
					</div>
				</Card>

				<Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-purple-500/20 rounded-lg">
							<Award className="h-5 w-5 text-purple-400" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Perfect Game</p>
							<p className="text-2xl font-bold text-purple-400">
								{completionPercentage}%
							</p>
						</div>
					</div>
				</Card>
			</div>

			{/* Overall Progress */}
			<div className="space-y-2">
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">Achievement Progress</h3>
					<span className="text-sm text-muted-foreground">
						{completionPercentage}% Complete
					</span>
				</div>
				<Progress value={completionPercentage} className="h-2" />
			</div>
		</div>
	);
};
