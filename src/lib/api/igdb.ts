import axios, { type InternalAxiosRequestConfig } from "axios";
import type { IGDBRelation } from "./igdb.types";
import type { Game, TimeToBeat } from "./igdb.types.ts";
import { IGDBQueryBuilder } from "./igdbQueryBuilder";

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

// IMPORTANT: Set your IGDB Bearer token in a .env file as VITE_IGDB_BEARER_TOKEN
// Example .env:
// VITE_IGDB_BEARER_TOKEN=your_token_here
// Add auth token interceptor
igdbClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	if (config.headers) {
		const token = import.meta.env.VITE_IGDB_BEARER_TOKEN;
		if (!token) {
			console.warn(
				"IGDB Bearer token is not set in .env (VITE_IGDB_BEARER_TOKEN)",
			);
		}
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const defaultFields: [IGDBRelation, string[]?][] = [
	["websites"],
	["cover", ["url", "image_id"]],
	["screenshots", ["url", "image_id"]],
	["alternative_names"],
	["franchises"],
	["game_engines"],
	["genres"],
	["game_modes"],
	["involved_companies"],
	["keywords"],
	["platforms"],
	["player_perspectives"],
	["similar_games"],
	["videos"],
];

/**
 * Send a multiquery string to the IGDB /multiquery endpoint.
 * @param query - The multiquery string (see IGDB docs for format)
 * @returns Array of named results, e.g. [{ name: "Games", result: [...] }, ...]
 */
const multiquery = async <T = unknown>(
	query: string,
): Promise<Array<{ name: string; result: T[] }>> => {
	const { data } = await igdbClient.post("/multiquery", query);
	return data;
};

export const igdbApi = {
	getGames: async ({
		where = "",
		search = "",
		limit = 10,
		fields = defaultFields,
		sort = "",
	}: {
		where?: string;
		search?: string;
		limit?: number;
		fields?: [IGDBRelation, string[]?][];
		sort?: string;
	}) => {
		const builder = new IGDBQueryBuilder(
			where ? `where ${where}` : search ? `search \"${search}\"` : "",
		);
		for (const [relation, relFields] of fields) {
			builder.with(relation, relFields);
		}
		let query = builder.build();
		if (sort) query += ` sort ${sort};`;
		if (limit) query += ` limit ${limit};`;
		const { data } = await igdbClient.post<Array<Game>>("/games", query);
		return data;
	},

	/**
	 * Fetch a single game and its time-to-beat data using multiquery, merged into one object.
	 * @param id - The game ID
	 * @returns The game object merged with its time-to-beat data
	 */
	getGame: async (id: number) => {
		const multiqueryString = `
query games "Games" {
  fields *,
    websites.url,
    websites.category,
    cover.image_id,
    cover.url,
    screenshots.image_id,
    screenshots.url,
    alternative_names.name,
    franchises.name,
    game_engines.name,
    genres.name,
    game_modes.name,
    involved_companies.publisher,
    involved_companies.developer,
    involved_companies.company.name,
    keywords.name,
    platforms.name,
    player_perspectives.name,
    similar_games.name,
    similar_games.slug,
    videos.name,
    videos.video_id,
    language_supports.language.name,
    language_supports.language.native_name,
    artworks.image_id,
    artworks.url,
    dlcs.name;
  where id = ${id};
  limit 1;
  exclude tags;
};

query game_time_to_beats "Game with time to beat" {
  fields *;
  where game_id = ${id};
};
`;
		const result = await igdbApi.multiquery(multiqueryString);
		const game = result.find((r) => r.name === "Games")?.result?.[0];
		const timeToBeat = result.find((r) => r.name === "Game with time to beat")
			?.result?.[0] as TimeToBeat | undefined;
		if (!game) return undefined;
		return { ...game, timeToBeat };
	},

	getMostAnticipatedGames: async () => {
		const now = Math.floor(Date.now() / 1000);
		return igdbApi.getGames({
			where: `hypes != null & first_release_date > ${now}`,
			fields: [["genres"], ["cover", ["url", "image_id"]], ["platforms"]],
			sort: "hypes desc",
			limit: 10,
		});
	},

	searchGames: async (search: string, limit = 20) => {
		return igdbApi.getGames({ search, limit });
	},

	multiquery,
};
