import { Request, Response } from 'express';
import { TeamService } from '../../../domain/services/TeamService';
import { CustomRequest } from '../../../types/express';
import { response } from '../../../utils/response';
import { TeamsRepository } from '../../repositories/TeamRepository';

const teamService = new TeamService();
const teamRepository = new TeamsRepository();

/**
 * Récupère toutes les teams.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const getAllTeams = async (req: Request, res: Response) => {
    const teams = await teamService.getAllTeams();
    console.table(teams);
    response(res, {
        statusCode: 200,
        message: 'OK',
        data: teams
    })
};

/**
 * Récupère une team par son id.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const getTeamById = async (req: Request, res: Response) => {
    const teamId = req.params.id;
    const team = await teamService.getTeamById(teamId);
    if (!team) {
        response(res, { statusCode: 404, message: 'Team not found' });
    } else {
        console.table(team[0]);
        response(res, { statusCode: 200, message: 'OK', data: team[0] });
    }
};

/**
 * crée une team.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const createTeam = async (req: CustomRequest, res: Response) => {
    try {
    const { name, pokemons } = req.body;

    if (!name?.trim() || !pokemons?.trim())
        return response(res, { statusCode: 400, message: 'Invalid name or pokemon' });

    const pokemonsNumber = Number(pokemons);
    if (isNaN(pokemonsNumber) || pokemonsNumber < 1 || pokemonsNumber > 151) {
        return response(res, { statusCode: 400, message: 'Le pokemon doit être compris entre le 1 et le 151' });
    }

    teamRepository.createTeam({ name, pokemons, author: req.user.userId });
        response(res, {statusCode: 201, message: 'Team created successfully'});
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    }
};

/**
 * supprime une team.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const deleteTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;
    await teamService.deleteTeam(id, userId);
    response(res, { statusCode: 200, message: 'team deleted' });
}