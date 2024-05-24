import { FastifyInstance } from "fastify";
import { taskAll } from "../../controllers/task/taskAll";

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
  server.get('/', opts, taskAll)
};