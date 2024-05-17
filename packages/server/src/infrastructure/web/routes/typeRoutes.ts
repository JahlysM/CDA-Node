import express from 'express';
import { getAllTypes } from '../controllers/TypeController';

const router = express.Router();

/**
 * routes des types /types
 */
router.get('/', getAllTypes);

export default router;