// IGDB Query Builder for flexible field selection
//
// Each withX(fields?) method adds fields for a relation. If fields are provided, only those are added (with the correct prefix); otherwise, default fields are used.

import type { IGDBRelation } from "./igdb.types";

export class IGDBQueryBuilder {
	private fields: string[] = ["*"];
	private searchClause: string;
	private whereClause: string;

	constructor({
		search = "",
		where = "",
	}: { search?: string; where?: string }) {
		this.searchClause = search;
		this.whereClause = where;
	}

	with(relation: IGDBRelation, fields?: string[]) {
		if (fields && fields.length > 0) {
			this.fields.push(...fields.map((f) => `${relation}.${f}`));
		} else {
			this.fields.push(`${relation}.*`);
		}
		return this;
	}

	build() {
		// Build the query parts
		const fieldsPart = `fields ${this.fields.join(",")};`;

		const parts = [fieldsPart];

		// Add search clause if provided
		if (this.searchClause.trim()) {
			const searchPart = this.searchClause.trim().endsWith(";")
				? this.searchClause.trim()
				: `search "${this.searchClause.trim()}";`;
			parts.push(searchPart);
		}

		// Add where clause if provided
		if (this.whereClause.trim()) {
			const wherePart = this.whereClause.trim().startsWith("where")
				? this.whereClause.trim().endsWith(";")
					? this.whereClause.trim()
					: `${this.whereClause.trim()};`
				: this.whereClause.trim().endsWith(";")
					? `where ${this.whereClause.trim()}`
					: `where ${this.whereClause.trim()};`;
			parts.push(wherePart);
		}

		return parts.join(" ");
	}
}
