import { beforeAll, describe, expect, it } from '@jest/globals';
import { TypeService } from '../../domain/services/TypeService';

/**
 * Suite de tests pour le service de gestion des types.
 */
describe('TypeService', () => {
    let typeService: TypeService;

    /**
     * Préparation avant tous les tests : initialise le TypeService.
     */
    beforeAll(async () => {
        typeService = new TypeService();
    });

    /**
     * Teste la récupération de tous les types.
     */
    it('should get all types', async () => {
        const types = await typeService.getAllTypes();
        types.forEach(type => {
            expect(type).toMatchObject({
                id: expect.any(String),
                name: expect.any(String)
            });
        });
    });
});
