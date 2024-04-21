import { FastifyInstance } from "fastify";

import { userCreateRoute } from "./user/userCreateRoute";
import { userLoginRoute } from "./user/userLoginRoute";

export async function routes (server:FastifyInstance) {
    server.register(userCreateRoute, {prefix: "/users"});
    server.register(userLoginRoute, {prefix: "/users"});
};

//TASK: title, description, colorBackground, isFavorito, idUser ;
//USER: name, password, email