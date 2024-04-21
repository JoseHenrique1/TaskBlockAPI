import fastify from 'fastify';
import 'dotenv/config';


const PORT = process.env.PORT;

const server = fastify();

server.get('/', async (request, reply) => {
  return 'pong\n'
})


server.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ error })
})

server.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err)
    
  }
  console.log(`Server listening at ${address}`)
});