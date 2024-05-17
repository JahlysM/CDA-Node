import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { teams } from "../../infrastructure/data/schema/teams";

export type Team = InferSelectModel<typeof teams>;

// de même pour NewPost: il aura les memes propriétés que la table posts
// sauf les propriétés qui sont générés automatiquement (comme id par exemple)
export type NewTeam = InferInsertModel<typeof teams>;

export type TeamColumns = { [K in keyof Team]?: boolean }