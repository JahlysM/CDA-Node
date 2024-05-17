import { InferSelectModel } from "drizzle-orm";
import { pokemons } from "../../infrastructure/data/schema/pokemons";

export type Pokemon = InferSelectModel<typeof pokemons>;

export type PokemonColumns = { [K in keyof Pokemon]?: boolean }