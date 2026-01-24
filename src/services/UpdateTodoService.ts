import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"
import { UpdateTodoData } from "../interfaces/todo"

export class UpdateTodoService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }

  public async execute(todoId: string, userId: string, updateData: UpdateTodoData): Promise<any> {
    const updatedTodo = await this.prisma.todo.update({
      where: { id: todoId, userId },
      data: updateData,
    })
    
    return updatedTodo
  }
}