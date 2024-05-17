import express from 'express';
import { getAllPokemons, getPokemonById } from '../controllers/PokemonController';

const router = express.Router();

/**
 * routes des pokemons /pokemons
 */
router.get('/', getAllPokemons);
router.get('/:id', getPokemonById);

export default router;