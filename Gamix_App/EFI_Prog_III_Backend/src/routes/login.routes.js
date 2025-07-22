import { Router } from "express";
import { login } from "../controllers/login.controllers.js";

const routerLogin = Router();

routerLogin.post('/', login);

export default routerLogin;