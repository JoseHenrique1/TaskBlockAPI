import { FastifyInstance } from "fastify";
import { prisma } from "../../database/prisma-client";
import { verify } from "jsonwebtoken";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface headerInterface {
    token: string
};

interface paramsInterface {
    taskId: string
};

interface JwtPayload{
  id: string
}

const opts = {
  schema: {
    params: {
        type: 'object',
        properties: {
            taskId: { type: 'string' },
        }
    },
    headers: {
        type: 'object',
        properties: {
            'token': { type: 'string' }
        },
        required: ['token']
    }
  }
};


export async function taskUniqueRoute (server:FastifyInstance) {
  server.get<{Headers:headerInterface, Params: paramsInterface }>('/:taskId', opts,  async (request, reply) => {
    const taskId = request.params.taskId;
    const token = request.headers.token;
    let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
    let task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: id
      }
    })
    reply.code(200).send({statusCode:200, task})
  })
};