import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";
import { prisma } from "../../database/prisma-client";

const JWT_SECRET_KEY : string = process.env.JWT_SECRET_KEY!;

interface headerInterface {
  token: string
};

interface JwtPayload{
id: string
}

export async function taskAll(request: FastifyRequest<{Headers: headerInterface}>, reply: FastifyReply) {
  const token = request.headers.token;
  let { id } = verify(token, JWT_SECRET_KEY) as JwtPayload;
  let tasks = await prisma.task.findMany({
    where: {
      userId: id
    }
  })
  reply.code(200).send({ statusCode: 200, tasks })
}