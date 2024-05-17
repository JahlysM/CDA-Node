import express from 'express';
import pokemonRoutes from './pokemonRoutes';
import teamRoutes from './teamRoutes';
import typeRoutes from './typeRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/pokemons', pokemonRoutes);
router.use('/types', typeRoutes);
router.use('/teams', teamRoutes);

export default router;