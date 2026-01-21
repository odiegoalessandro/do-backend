import { prisma } from "../config/prisma"
import { PrismaClient } from "../generated/prisma/client"

export class GetCategoryService {
  private prisma: PrismaClient
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient
  }

  public async execute(categoryId: string): Promise<any> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId }
    })
    
    return category
  }
}