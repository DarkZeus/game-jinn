// IGDB API types

export type IGDBRelation =
	| "cover"
	| "screenshots"
	| "websites"
	| "alternative_names"
	| "franchises"
	| "game_engines"
	| "genres"
	| "game_modes"
	| "involved_companies"
	| "keywords"
	| "platforms"
	| "player_perspectives"
	| "similar_games"
	| "videos"
	| "artworks"
	| (string & {});

export type Company = {
	id: number;
	name: string;
};

export type Cover = {
	id: number;
	alpha_channel: boolean;
	animated: boolean;
	game: number;
	height: number;
	image_id: string;
	url: string;
	width: number;
	checksum: string;
};

export type Screenshot = {
	id: number;
	alpha_channel: boolean;
	animated: boolean;
	game: number;
	height: number;
	image_id: string;
	url: string;
	width: number;
	checksum: string;
};

export type AlternativeName = {
	id: number;
	name: string;
};

export type Franchise = {
	id: number;
	name: string;
	slug: string;
	url: string;
};

export type GameEngine = {
	id: number;
	name: string;
	slug: string;
	url: string;
	description?: string;
};

export type Genre = {
	id: number;
	name: string;
	slug?: string;
	url?: string;
};

export type GameMode = {
	id: number;
	name: string;
	slug?: string;
	url?: string;
};

export type InvolvedCompany = {
	id: number;
	company?: Company;
	developer?: boolean;
	publisher?: boolean;
	porting?: boolean;
	supporting?: boolean;
};

export type Keyword = {
	id: number;
	name: string;
	slug?: string;
	url?: string;
};

export type PlayerPerspective = {
	id: number;
	name: string;
	slug?: string;
	url?: string;
};

export type SimilarGame = {
	id: number;
	name: string;
	slug?: string;
	url?: string;
};

export type Video = {
	id: number;
	name?: string;
	video_id: string;
};

export type Website = {
	id: number;
	url: string;
	category: number;
	trusted?: boolean;
	type?: number;
};

export type Game = {
	id: number;
	name: string;
	slug: string;
	cover?: Cover;
	platforms?: Platform[];
	genres?: Genre[];
	summary?: string;
	rating?: number;
	rating_count?: number;
	first_release_date?: number;
	aggregated_rating?: number;
	aggregated_rating_count?: number;
	total_rating?: number;
	total_rating_count?: number;
	hypes?: number;
	game_modes?: GameMode[];
	player_perspectives?: PlayerPerspective[];
	themes?: Array<{ id: number; name: string }>;
	websites?: Website[];
	screenshots?: Screenshot[];
	alternative_names?: AlternativeName[];
	franchises?: Franchise[];
	game_engines?: GameEngine[];
	involved_companies?: InvolvedCompany[];
	keywords?: Keyword[];
	similar_games?: SimilarGame[];
	videos?: Video[];
};

export type Platform = { id: number; name: string };

// Type for time-to-beat data from IGDB
export type TimeToBeat = {
	id: number;
	game_id: number;
	hastily: number;
	normally: number;
	completely: number;
	count: number;
	created_at: number;
	updated_at: number;
	checksum: string;
};

// Type for merged game with time to beat
export type GameWithTimeToBeat = Game & { timeToBeat?: TimeToBeat };
