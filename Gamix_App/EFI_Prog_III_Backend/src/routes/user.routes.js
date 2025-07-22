import { Router } from "express";
import { validateToken } from "../helpers/validateToken.js";
import { getUserRegister, postUsersRegister, getUserById, getAuthUser, updateUser } from "../controllers/user.controllers.js";

const routerRegister = Router();

routerRegister.get('/', getUserRegister);

routerRegister.post('/', postUsersRegister);

routerRegister.get('/profile', validateToken, getAuthUser);

/* El orden de las rutas es secuencial, por ende, las rutas dinámicas (:id), es decir aquellas que van a cambiar de parámetros, van debajo. Ya que si no, cuando hago una petición GET /profile, Express lo interpreta como una coincidencia con la ruta /:id y ejecuta la función getUserById. */

routerRegister.get('/:id', getUserById);

routerRegister.put('/:id', updateUser);

export default routerRegister;