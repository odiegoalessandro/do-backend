import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"
import { UpdateCategoryData } from "../interfaces/category"
import { AppError } from "../middlewares/errorHandler"

export class UpdateCategoryService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }
 
  public async execute(categoryId: string, userId: string, data: UpdateCategoryData) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category || category.userId !== userId) {
      throw new AppError("BAD_REQUEST", 404, "Categoria não encontrada ou sem permissão")
    }
    
    const update: UpdateCategoryData = {}

    if (data.name) {
      Object.assign(update, { name: data.name })
    }

    if (data.color) {
      Object.assign(update, { color: data.color })
    }

    return await this.prisma.category.update({
      where: { id: categoryId },
      data: update
    })
  }
}