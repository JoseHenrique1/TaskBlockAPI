import { FastifyInstance } from "fastify";
import { prisma } from "../../database/prisma-client";
import { verify } from "jsonwebtoken";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface headerInterface {
    token: string
};

interface JwtPayload{
  id: string
}

const opts = {
  schema: {
    headers: {
        type: 'object',
        properties: {
            'token': { type: 'string' }
        },
        required: ['token']
    }
  }
};

export async function taskAllRoute (server:FastifyInstance) {
  server.get<{Headers:headerInterface}>('/', opts, async (request, reply) => {
    const token = request.headers.token;
    let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
    let tasks = await prisma.task.findMany({
      where: {
        userId: id
      }
    })
    reply.code(200).send({statusCode:200, tasks})
  })
};