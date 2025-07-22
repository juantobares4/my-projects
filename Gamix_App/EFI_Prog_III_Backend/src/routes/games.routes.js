import { Router } from "express";
import { getAllGames, getGame, postGame, updateGame, deleteGame, searchGamesByName } from "../controllers/games.controllers.js";
import { validateToken } from "../helpers/validateToken.js";
import { blockedRouteFor } from "../helpers/blockedRouteFor.js";

const routerGames = Router();

routerGames.get('/', getAllGames); // La ruta es http://localhost:3001/games GET

routerGames.get('/search', searchGamesByName);

routerGames.get('/:id', getGame);

routerGames.post('/', validateToken, blockedRouteFor('gamer'), postGame); // http://localhost:3001/games POST

routerGames.put('/:id', validateToken, blockedRouteFor('gamer'), updateGame); // http://localhost:3001/games/:id PUT

routerGames.delete('/:id', validateToken, blockedRouteFor('gamer'), deleteGame); // http://localhost:3001/games/:id DELETE

export default routerGames;