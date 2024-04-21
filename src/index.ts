import fastify from 'fastify';
import 'dotenv/config';

import { routes } from './routes';

const PORT = process.env.PORT;
const server = fastify();

server.get('/', async (request, reply) => {
  return 'pong\n'
})

server.register(routes);

server.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ error })
})

server.listen({ port: Number(PORT) }, (err, address) => {
  if (err) { console.error(err)}
  console.log(`Server listening at ${address}`)
});