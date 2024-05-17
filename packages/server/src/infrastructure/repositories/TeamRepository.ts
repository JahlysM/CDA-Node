import { eq } from "drizzle-orm";
import { NewTeam } from "../../domain/entities/Team";
import { db } from "../data";
import { pokemons, users } from "../data/schema";
import { teams } from "../data/schema/teams";

// Repository qui gère le CRUD des posts
export class TeamsRepository {
    // Récupérer une team par son id
    getTeamById(id: string): Promise< any > {
        try {
            return db.select({
                id: teams.id,
                name: teams.name,
                author: {
                    id: users.id,
                    username: users.username
                },
                pokemons: {
                    id: pokemons.id,
                    name: pokemons.name
                }
            }).from(teams)
            .leftJoin(
                pokemons, eq(teams.pokemons, pokemons.id)
            ).leftJoin(
                users, eq(teams.author, users.id)
            ).where(eq(teams.id, id))
            .execute();

        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer votre team');
        }
    }

    getAllTeams() {
        try {
            return db.select({
                id: teams.id,
                name: teams.name,
                author: {
                    id: users.id,
                    username: users.username
                },
                pokemons: {
                    // id: pokemons.id,
                    name: pokemons.name
                }
            }).from(teams)
            .leftJoin(
                pokemons, eq(teams.pokemons, pokemons.id)
            ).leftJoin(
                users, eq(teams.author, users.id)
            ).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les teams');
        }
    }

    deleteTeam(id: string) {
        try {
            return db.delete(teams).where(eq(teams.id, id)).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer la team');
        }
    }
    


    // ajouter une team
    createTeam(team: NewTeam) {
        try {
            console.table(team)
            return db.insert(teams).values(team).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de créer la team');
        }
    }

}