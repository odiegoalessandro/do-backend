import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"
import { UpdateTodoData } from "../interfaces/todo"
import { AppError } from "../middlewares/errorHandler"

export class UpdateTodoService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }

  public async execute(todoId: string, userId: string, updateData: UpdateTodoData): Promise<any> {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    })

    if (!todo || todo.userId !== userId) {
      throw new AppError("BAD_REQUEST", 404, "Todo not found or no permission")
    }

    const update: UpdateTodoData = {}
    
    if (updateData.status) {
      Object.assign(update, { status: updateData.status })
    }

    if (updateData.description) {
      Object.assign(update, { description: updateData.description })
    }

    if (updateData.categoryId) {
      Object.assign(update, { categoryId: updateData.categoryId })
    }

    return await this.prisma.todo.update({
      where: { id: todoId },
      data: update,
    })    
  }
}