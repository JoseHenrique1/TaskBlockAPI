import { FastifyInstance } from "fastify";

import { userCreateRoute } from "./user/userCreateRoute";
import { userLoginRoute } from "./user/userLoginRoute";

import { taskCreateRoute } from "./task/taskCreateRoute";
import { taskAllRoute } from "./task/taskAllRouter";
import { taskUniqueRoute } from "./task/taskUniqueRouter";


export async function routes (server:FastifyInstance) {
    server.register(userCreateRoute, {prefix: "/users"});
    server.register(userLoginRoute, {prefix: "/users"});

    server.register(taskCreateRoute, {prefix: "/tasks"});
    server.register(taskAllRoute, {prefix: "/tasks"});
    server.register(taskUniqueRoute, {prefix: "/tasks"});
};

//TASK: title, description, colorBackground, isFavorito, idUser ;
//USER: name, password, email