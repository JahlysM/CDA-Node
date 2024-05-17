import express from 'express';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';
import { login, logout, register } from '../controllers/UserController';

const router = express.Router();

/**
 * routes des users /users
 */
// [POST] http://localhost:8000/users/login
router.post('/login', login);

// [POST] http://localhost:8000/users/register
router.post('/register', register);

// [GET] http://localhost:8000/users/logout
router.get('/logout', isAuthenticated, logout);

export default router;