import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

/**
 * Définition de la table "types" en base de données.
 */
export const types = pgTable('types', {
    id: text('id').primaryKey(), // Clé primaire
    name: varchar('name', { length: 255 }).notNull(), // Nom du type, non null
});
