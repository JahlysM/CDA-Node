import { Request, Response } from 'express';
import { PokemonService } from '../../../domain/services/PokemonService';
import { response } from '../../../utils/response';

const pokemonService = new PokemonService();

/**
 * Récupère tous les Pokémons.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const getAllPokemons = async (req: Request, res: Response) => {
    const pokemons = await pokemonService.getAllPokemons();
    console.table(pokemons);
    response(res, {
        statusCode: 200,
        message: 'OK',
        data: pokemons
    })
};


/**
 * Récupère tous les Pokémons.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const getPokemonById = async (req: Request, res: Response) => {
    const pokemonId = req.params.id;
    const pokemon = await pokemonService.getPokemonById(pokemonId);
    if (!pokemon) {
        response(res, { statusCode: 404, message: 'Pokemon not found' });
    } else {
        console.table(pokemon[0]);
        response(res, { statusCode: 200, message: 'OK', data: pokemon[0] });
    }
};