import { FastifyInstance } from "fastify";
import { prisma } from "../../database/prisma-client";
import { verify } from "jsonwebtoken";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface bodyInterface {
    title: string,
    description: string,
    isFavorite: boolean,
    colorBackground: string,
};

interface headerInterface {
    token: string
};

interface JwtPayload{
  id: string
}

const opts = {
  schema: {
    header: {
        type: 'object',
        properties: {
            'token': { type: 'string' }
        },
        required: ['token']
    },
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isFavorite: {type: 'boolean'},
        colorBackground: { type: 'string' },
      },
      required: ['title']
    }
  }
};

export async function taskCreateRoute (server:FastifyInstance) {
  server.post<{Body:bodyInterface, Headers:headerInterface}>('/', opts, async (request, reply) => {
    const token = request.headers.token;
    const body = request.body;
    let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
    let data = {
      ...body,
      userId: id
    };  
    let task = await prisma.task.create({data})
    reply.code(200).send({statusCode:200})
  })
};