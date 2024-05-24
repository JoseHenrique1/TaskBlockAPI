import { FastifyInstance } from "fastify";
import { userCreate } from "../../controllers/user/userCreate";

const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['name', 'email', 'password']
    }
  }
};

export async function userCreateRoute (server:FastifyInstance) {
  server.post('/', opts, userCreate)
};