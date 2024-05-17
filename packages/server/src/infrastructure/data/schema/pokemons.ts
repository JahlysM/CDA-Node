import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { types } from './types';

/**
 * Définition de la table 'pokemons'.
 * Cette table stocke les informations sur les Pokémon.
 */
export const pokemons = pgTable('pokemons', {
    id: varchar('id').primaryKey(), // Clé primaire
    name: varchar('name', { length: 255 }).notNull(), // Nom du Pokémon, non nul
    types: varchar('types').references(() => types.id).notNull(), // Clé étrangère faisant référence à la table 'types', non nul
});
