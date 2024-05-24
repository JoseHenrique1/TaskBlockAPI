import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database/prisma-client";

interface bodyInterface {
  name: string,
  email: string,
  password: string
};

export async function userCreate (request: FastifyRequest<{Body:bodyInterface}>, reply: FastifyReply) {
  let name = request.body.name;
  let password = request.body.password;
  let email = request.body.email;
  let data = {
    name,
    password,
    email
  }
  const user = await prisma.user.create({data})
  reply.code(200).send({statusCode:200})
}