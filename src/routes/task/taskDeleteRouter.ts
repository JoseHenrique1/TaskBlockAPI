import { FastifyInstance } from "fastify";
import { taskDelete } from "../../controllers/task/taskDelete";

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
  }
};

export async function taskDeleteRoute (server:FastifyInstance) {
  server.delete('/:taskId', opts,  taskDelete)
};