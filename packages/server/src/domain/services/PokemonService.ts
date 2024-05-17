import { PokemonsRepository } from "../../infrastructure/repositories/PokemonRepository";

/**
 * Service pour la gestion des Pokémon.
 */
export class PokemonService {
    private PokemonsRepository: PokemonsRepository;

    /**
     * Constructeur de PokemonService.
     * Initialise un nouvel objet PokemonService avec une instance de PokemonsRepository.
     */
    constructor() {
        this.PokemonsRepository = new PokemonsRepository();
    }

    /**
     * Récupère un Pokémon par son identifiant.
     * @param {string} id - L'identifiant du Pokémon à récupérer.
     * @returns {Promise<any>} Une promesse résolue avec le Pokémon correspondant à l'identifiant, ou undefined s'il n'y a pas de correspondance.
     */
    getPokemonById(id: string) {
        console.log('ID:', id);
        
        // Vérifie si l'identifiant est valide
        if (!id || id.trim().length < 1)
            return;
        // Récupère le Pokémon par son identifiant depuis le repository
        return this.PokemonsRepository.getPokemonById(id);
    }

    /**
     * Récupère tous les Pokémons.
     */
    getAllPokemons() {
        // Récupère tous les Pokémons depuis le repository
        return this.PokemonsRepository.getAllPokemons();
    }
}
