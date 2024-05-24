import { FastifyInstance } from "fastify";
import { taskUnique } from "../../controllers/task/taskUnique";

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
  server.get('/:taskId', opts,  taskUnique)
};