import jwt from 'jsonwebtoken';
import env from '../../config/env';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../entities/User';

const { REFRESH_SECRET, JWT_SECRET } = env;

/**
 * Service pour gérer l'authentification.
 */
export class AuthService {
    private refreshTokenStore: Map<string, string> = new Map();
    private UserRepository = new UserRepository();

    /**
     * Génère un jeton d'accès JWT pour un utilisateur avec une durée de validité de 15 minutes.
     * @param {string} id - L'identifiant de l'utilisateur pour lequel générer le jeton.
     * @returns {string} Le jeton d'accès JWT généré.
     */
    issueAccessToken(id: string): string {
        return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '15m' });
    }

    /**
     * Génère un jeton de rafraîchissement JWT pour un utilisateur.
     * @param {string} id - L'identifiant de l'utilisateur pour lequel générer le jeton de rafraîchissement.
     */
    async issueRefreshToken(id: string) {
        // On crée un refreshToken qui va durer longtemps (par exemple, 7 jours)
        const refreshToken = jwt.sign({ userId: id}, REFRESH_SECRET, { expiresIn: '7d' });
        const user = await this.UserRepository.getUserById(id, { id: true, refreshToken: true });
        if (user) {
            this.UserRepository.updateUser({...user, refreshToken: refreshToken} as User);
        }

        // On retourne le JWT pour s'en servir dans le controller (écriture de cookies)
        return refreshToken;
    }

    /**
     * Rafraîchit un jeton d'accès JWT à partir d'un jeton de rafraîchissement.
     * @param {string} refreshToken - Le jeton de rafraîchissement JWT à utiliser pour rafraîchir le jeton d'accès.
     */
    async refreshAccessToken(refreshToken: string) {
        try {
            // On vérifie que le token en paramètre est bien valide
            const payload = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;
            const user = await this.UserRepository.getUserById(payload.userId, { id: true, refreshToken: true });

            if (user && user.refreshToken === refreshToken) {
                // On génère un nouveau token d'accès
                return this.issueAccessToken(payload.userId);
            }

            // On récupère ce même token dans notre store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId);

            // Si ce token existe dans le store, cela implique qu'il est valide.
            if (storedRefreshToken === refreshToken) {
                // On génère un nouveau token de rafraîchissement
                const newAccessToken = this.issueAccessToken(payload.userId);
                return newAccessToken;
            } else {
                 // Suppression des cookies du jeton d'accès et du jeton de rafraîchissement
                if (user) {
                    user.refreshToken = ''
                    this.UserRepository.updateUser(user as User);
                }

                throw new Error('Invalid refresh token');
            }
        } catch(err) {
            console.error(err);

            throw new Error('Invalid refresh token');
        }
    }
}
