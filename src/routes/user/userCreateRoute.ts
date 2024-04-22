import { FastifyInstance } from "fastify";
import { prisma } from "../../database/prisma-client";

interface bodyInterface {
  name: string,
  email: string,
  password: string
};

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
  server.post<{Body:bodyInterface}>('/', opts, async (request, reply) => {
    let name = request.body.name;
    let password = request.body.password;
    let email = request.body.email;
    let data = {
      name,
      password,
      email
    }
    const user = await prisma.user.create({data})
    reply.code(200).send({statusCode:200})
  })
};