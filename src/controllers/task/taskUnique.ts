import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../database/prisma-client";
import { verify } from "jsonwebtoken";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface headerInterface {
    token: string
};

interface paramsInterface {
    taskId: string
};

interface JwtPayload{
  id: string
}

export async function taskUnique (request: FastifyRequest<{Headers:headerInterface, Params: paramsInterface }>, reply: FastifyReply)  {
  const taskId = request.params.taskId;
  const token = request.headers.token;
  let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
  let task = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId: id
    }
  })
  reply.code(200).send({statusCode:200, task})
}