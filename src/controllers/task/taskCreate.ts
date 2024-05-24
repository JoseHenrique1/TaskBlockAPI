import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";
import { prisma } from "../../database/prisma-client";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface headerInterface {
  token: string
};

interface bodyInterface {
  title: string,
  description: string,
  isFavorite: boolean,
  colorBackground: string,
};

interface JwtPayload{
id: string
}


export async function taskCreate (request: FastifyRequest<{Body:bodyInterface, Headers:headerInterface}>, reply: FastifyReply) {
  const token = request.headers.token;
  const body = request.body;
  let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
  let data = {
    ...body,
    userId: id
  };  
  let task = await prisma.task.create({data})
  reply.code(200).send({statusCode:200, task})
}