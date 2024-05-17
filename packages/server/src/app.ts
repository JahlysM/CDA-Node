import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from 'helmet';
import http from "http";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import env from "./config/env";
import router from "./infrastructure/web/routes";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/logger";
import { refreshTokenMiddleware } from "./middlewares/refreshToken";
dotenv.config();

const swaggerDocument = YAML.load('./swagger.yaml');

const { PORT, FRONTEND_URL } = env;

const app = express();
const server = http.createServer(app);

// mw pour pouvoir lire les cookies plus facilement
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mw cors pour autoriser les requêtes cross-origin (depuis localhost:5173)
app.use(cors({
    origin: FRONTEND_URL, // url de l'application front
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true // on peut permettre le transfert de cookies
}))

app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// un middleware est executé avant que la requête n'atteigne la route spécifique
function middleware1(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 1");
    next();
}

// applique le middleware1 à toutes les requêtes entrantes avant qu'elles n'atteignent les routes
// spécifiques
app.use(requestLogger);
app.use(refreshTokenMiddleware);

// [GET] http://localhost:8000/
app.get("/", middleware1, function (req: Request, res: Response) {
    console.log("Ceci est un console log, qui ne sera JAMAIS affiché dans le navigateur, mais seulement le terminal du serveur (ici terminal vscode)")
    res.send("Hello World pas piqué des hannetons");
})

// [GET] http://localhost:8000/error
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Erreur de test pour montrer les mw d\'erreurs');
    next(error); // pour passer à l'errorHandler
})

app.use(router);

// Middleware de gestion d'erreur => toujours tout à la fin des routes et autres mw
app.use(errorHandler);

// Faire écouter l'app sur le port spécifié puis afficher msg
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})