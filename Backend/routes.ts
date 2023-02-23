import { knex} from "./server"
import express from "express";

import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { CoreService } from "./service/CoreService";
import { CoreController } from "./controller/CoreController";


const userService = new UserService(knex);
export const userController = new UserController(userService);

const coreService = new CoreService(knex);
export const coreController = new CoreController(coreService);


import { userRoutes } from "./routes/userRoutes";
import { coreRoutes } from "./routes/coreRoutes";

export const routes = express.Router();
routes.use("/users", userRoutes);
routes.use("/core", coreRoutes);
