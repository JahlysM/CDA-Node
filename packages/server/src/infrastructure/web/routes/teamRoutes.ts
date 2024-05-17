import express from 'express';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';
import { createTeam, deleteTeamById, getAllTeams, getTeamById } from '../controllers/TeamController';

const router = express.Router();

/**
 * routes des teams /teams
 */
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.post('/', isAuthenticated, createTeam);
router.delete('/:id', isAuthenticated, deleteTeamById );

export default router;