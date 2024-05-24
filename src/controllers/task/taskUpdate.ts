import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database/prisma-client";
import { verify } from "jsonwebtoken";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface paramsInterface {
  taskId: string
};

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

export async function taskUpdate (request: FastifyRequest<{Headers:headerInterface, Params: paramsInterface, Body: bodyInterface}>, reply: FastifyReply) {
  const taskId = request.params.taskId;
  const token = request.headers.token;
  let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
  const data = request.body;
  
  let task = await prisma.task.update({
    where: {
      id: taskId,
      userId: id
    },
    data
  })
  reply.code(200).send({statusCode:200, task})
}