import { db } from "../data";
import { types } from "../data/schema/types";

// Repository qui gère l'affichage des types'
export class TypesRepository {

    // Récupérer tout les types existants dans notre types.json
    getAllTypes() {
        try {
            return db.select({
                id: types.id,
                name: types.name,
            }).from(types)
            .execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les types');
        }
    }
}