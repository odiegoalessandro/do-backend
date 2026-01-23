import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"

export class DeleteTodoService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }

  public async execute(todoId: string): Promise<void> {
    await this.prisma.todo.delete({
      where: { id: todoId }
    })
  }
}