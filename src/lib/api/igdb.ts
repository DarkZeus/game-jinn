import axios, { type InternalAxiosRequestConfig } from "axios";

const PROXY_URL = "http://localhost:8080/";
const IGDB_URL = "https://api.igdb.com/v4";

const igdbClient = axios.create({
	baseURL: PROXY_URL + IGDB_URL,
	headers: {
		"Client-ID": "t7c5dlstilqkeww1gffxpp7qkmqzg2",
		"Content-Type": "text/plain",
		"X-Requested-With": "XMLHttpRequest",
	},
});

// Add auth token interceptor
igdbClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	if (config.headers) {
		config.headers.Authorization = "Bearer vsqkg4nb8556a68vg3626zct6mfev4";
	}
	return config;
});

export interface Game {
	id: number;
	name: string;
	slug: string;
	cover?: {
		id: number;
		url: string;
	};
	platforms?: Array<{
		id: number;
		name: string;
	}>;
	genres?: Array<{
		id: number;
		name: string;
	}>;
	summary?: string;
	rating?: number;
	rating_count?: number;
	first_release_date?: number;
	aggregated_rating?: number;
	aggregated_rating_count?: number;
	total_rating?: number;
	total_rating_count?: number;
	game_modes?: Array<{
		id: number;
		name: string;
	}>;
	player_perspectives?: Array<{
		id: number;
		name: string;
	}>;
	themes?: Array<{
		id: number;
		name: string;
	}>;
	websites?: Array<{
		id: number;
		url: string;
		category: number;
	}>;
}

const GAME_FIELDS =
	"fields name,slug,cover.url,platforms.name,genres.name,summary,rating,rating_count,first_release_date,aggregated_rating,aggregated_rating_count,total_rating,total_rating_count,game_modes.name,player_perspectives.name,themes.name,websites.*";

export const igdbApi = {
	getGames: async (limit = 10) => {
		const { data } = await igdbClient.post<Array<Game>>(
			"/games",
			`${GAME_FIELDS}; limit ${limit};`,
		);
		return data;
	},

	getGame: async (id: number) => {
		const { data } = await igdbClient.post<Array<Game>>(
			"/games",
			`${GAME_FIELDS}; where id = ${id};`,
		);
		return data[0];
	},
};
