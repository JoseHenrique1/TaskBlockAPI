import { FastifyInstance } from "fastify";
import { prisma } from "../../database/prisma-client";
import { sign } from "jsonwebtoken";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface user {
  id: string
}

interface bodyInterface {
  email: string,
  password: string
};

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
  server.post<{Body:bodyInterface}>('/login', opts, async (request, reply) => {
    let password = request.body.password;
    let email = request.body.email;

    const user: user|null = await prisma.user.findUnique({
      where: {
        password,
        email
      }
    })
    
    if(!user) { // se o usuario não existir, nada será retornado
      reply.code(404).send({statusCode:404})
    }

    let token = sign(user!, JWT_SECRET_KEY, {mutatePayload: true});    
    reply.code(200).send({statusCode:200, token, user})
  })
};