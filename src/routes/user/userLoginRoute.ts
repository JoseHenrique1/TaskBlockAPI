import { FastifyInstance } from "fastify";
import { userLogin } from "../../controllers/user/userLogin";

const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password']
    }
  }
};

export async function userLoginRoute (server:FastifyInstance) {
  server.post('/login', opts, userLogin)
};