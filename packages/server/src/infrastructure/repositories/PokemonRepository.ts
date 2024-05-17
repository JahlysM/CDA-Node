import { eq } from "drizzle-orm";
import { db } from "../data";
import { pokemons } from "../data/schema/pokemons";
import { types } from "../data/schema/types";

/**
 * Repository pour la gestion des Pokémon.
 */
export class PokemonsRepository {
     /**
     * Récupère un Pokémon par son identifiant.
     * @param {string} id - L'identifiant du Pokémon à récupérer.
     * @returns {Promise&lt;any&gt;} Une promesse résolue avec le Pokémon correspondant à l'identifiant, ou rejetée s'il n'y a pas de correspondance.
     */
    getPokemonById(id: string): Promise< any > {
        try {
            return db.select({
                id: pokemons.id,
                name: pokemons.name,
                types: {
                    // id: types.id,
                    type: types.name
                },
            }).from(pokemons)
            .leftJoin(
                types, eq(pokemons.types, types.id)
            )
            .where(
                eq(pokemons.id, id)
            ).execute();

        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer le pokemon');
        }
    }

    /**
     * Récupère tous les Pokémons.
     * @returns {Promise<any>} Une promesse résolue avec un tableau contenant tous les Pokémons.
     */
    getAllPokemons() {
        try {
            return db.select({
                id: pokemons.id,
                name: pokemons.name,
                types: {
                    id: types.id,
                    type: types.name
                },
            }).from(pokemons)
            .leftJoin(
                types, eq(pokemons.types, types.id)
            )
            .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les pokemons');
        }
    }
}