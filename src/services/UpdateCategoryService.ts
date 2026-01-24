import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"
import { UpdateCategoryData } from "../interfaces/category"

export class UpdateCategoryService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }
 
  public async execute(categoryId: string, userId: string, data: UpdateCategoryData): Promise<void> {
    await this.prisma.category.update({
      where: { id: categoryId, userId },
      data
    })
  }
}