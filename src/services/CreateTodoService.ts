import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"
import { CreateTodoData } from "../interfaces/todo"

export class CreateTodoService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }

  public async execute({ description, categoryId, userId }: CreateTodoData): Promise<any> {
    const todo = await this.prisma.todo.create({
      data: {
        description,
        category: { connect: { id: categoryId } },
        user: { connect: { id: userId } },
      }
    })
    
    return todo
  }
}