import { prisma } from "../config/prisma"
import { PrismaClient, Todo } from "../generated/prisma/client"

export class GetTodosByCategoryService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }

  public async execute(categoryId: string, userId: string): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: { categoryId, userId },
    })
  }
}
