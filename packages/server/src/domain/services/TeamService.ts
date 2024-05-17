import { TeamsRepository } from "../../infrastructure/repositories/TeamRepository";

/**
 * Service pour la gestion des équipes.
 */
export class TeamService {
    private teamsRepository: TeamsRepository;

    /**
     * Constructeur de TeamService.
     * Initialise un nouvel objet TeamService avec une instance de TeamsRepository.
     */
    constructor() {
        this.teamsRepository = new TeamsRepository();
    }

    /**
     * Récupère une équipe par son identifiant.
     * @param {string} id - L'identifiant de l'équipe à récupérer.
     * @returns {Promise<any>} Une promesse résolue avec l'équipe correspondante à l'identifiant, ou null si l'identifiant n'est pas valide.
     */
    async getTeamById(id: string) {
        console.log('ID:', id);
        
        if (!id || id.trim().length < 1) {
            return null; // Renvoie null si l'ID n'est pas valide
        }

        const team = await this.teamsRepository.getTeamById(id);
        return team;
    }

    /**
     * Récupère toutes les équipes.
     * @returns {Promise<any[]>} Une promesse résolue avec un tableau contenant toutes les équipes.
     */
    getAllTeams() {
        return this.teamsRepository.getAllTeams();
    }

    /**
     * Supprime une équipe.
     * @param {string} id - L'identifiant de l'équipe à supprimer.
     * @param {string} userId - L'identifiant de l'utilisateur effectuant la suppression.
     * @returns {Promise<void>} Une promesse résolue une fois que l'équipe est supprimée.
     */
    deleteTeam(id: string, userId: string) {
        return this.teamsRepository.deleteTeam(id);
    }

}
