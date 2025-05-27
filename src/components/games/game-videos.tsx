import type { Video } from "@/lib/api/igdb.types";

type GameVideosProps = {
	videos: Video[];
};

export const GameVideos = ({ videos }: GameVideosProps) => {
	if (videos.length === 0) return null;

	return (
		<div className="mt-8">
			<h2 className="text-lg font-semibold mb-2">Videos</h2>
			<div className="flex flex-wrap gap-3">
				{videos.map((vid: Video) => (
					<a
						key={vid.id}
						href={`https://youtube.com/watch?v=${vid.video_id}`}
						className="text-blue-500 hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						{vid.name || vid.video_id}
					</a>
				))}
			</div>
		</div>
	);
};
