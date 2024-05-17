import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { pokemons } from './pokemons';
import { users } from './users';

// Définition de la table pour les équipes
export const teams = pgTable('teams', {
    id: uuid('id').defaultRandom().primaryKey(), // Clé primaire de l'équipe
    name: varchar('name', { length: 255}).notNull(), // Nom de l'équipe, non nullable
    pokemons: varchar('pokemons').references(() => pokemons.id).notNull(), // Clé étrangère référençant les Pokémon de l'équipe
    author: uuid('author').references(() => users.id, {onDelete: 'cascade'}).notNull(), // Clé étrangère référençant l'auteur de l'équipe
});
