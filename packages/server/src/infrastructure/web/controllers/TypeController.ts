import { Request, Response } from 'express';
import { TypeService } from '../../../domain/services/TypeService';
import { response } from '../../../utils/response';

const typeService = new TypeService();

/**
 * Récupère tout les types.
 * @param {Request} req - La requête HTTP entrante.
 * @param {Response} res - La réponse HTTP à renvoyer.
 */
export const getAllTypes = async (req: Request, res: Response) => {
    const types = await typeService.getAllTypes();
    console.table(types);
    response(res, {
        statusCode: 200,
        message: 'OK',
        data: types
    })
};
