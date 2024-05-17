import { TypesRepository } from "../../infrastructure/repositories/TypeRepository";

/**
 * Service pour la gestion des types de Pokémon.
 */
export class TypeService {
    private TypesRepository: TypesRepository;

    /**
     * Constructeur de TypeService.
     * Initialise un nouvel objet TypeService avec une instance de TypesRepository.
     */
    constructor() {
        this.TypesRepository = new TypesRepository();
    }

    /**
     * Récupère tous les types de Pokémon.
     * @returns {Promise<any[]>} Une promesse résolue avec un tableau contenant tous les types de Pokémon.
     */
    getAllTypes() {
        return this.TypesRepository.getAllTypes();
    }
}
