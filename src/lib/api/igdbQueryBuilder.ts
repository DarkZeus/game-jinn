// IGDB Query Builder for flexible field selection
//
// Each withX(fields?) method adds fields for a relation. If fields are provided, only those are added (with the correct prefix); otherwise, default fields are used.

import type { IGDBRelation } from "./igdb.types";

export class IGDBQueryBuilder {
	private fields: string[] = ["*"];
	private whereClause: string;

	constructor(whereClause: string) {
		this.whereClause = whereClause;
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
		// Ensure both fields and where clause end with a semicolon
		const fieldsPart = `fields ${this.fields.join(",")};`;
		const wherePart = this.whereClause.trim().endsWith(";")
			? this.whereClause.trim()
			: `${this.whereClause.trim()};`;
		return `${fieldsPart} ${wherePart}`.trim();
	}
}
