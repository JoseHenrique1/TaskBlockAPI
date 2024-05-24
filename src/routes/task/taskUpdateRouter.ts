import { FastifyInstance } from "fastify";
import { taskUpdate } from "../../controllers/task/taskUpdate";

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
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            isFavorite: {type: 'boolean'},
            colorBackground: { type: 'string' },
        },
        required: ['title', 'description', 'isFavorite', 'colorBackground']
    }
  }
};


export async function taskUpdateRoute (server:FastifyInstance) {
  server.put('/:taskId', opts,  taskUpdate)
};