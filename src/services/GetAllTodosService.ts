import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";

export class GetAllTodosService {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient;
  }

  public async execute(userId: string) {
    const todos = await this.prisma.todo.findMany({
      where: { userId },
    });
    return todos;
  }
}