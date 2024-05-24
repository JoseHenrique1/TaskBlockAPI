import { FastifyInstance } from "fastify";
import { taskCreate } from "../../controllers/task/taskCreate";

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
    headers: {
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
  server.post('/', opts, taskCreate)
};