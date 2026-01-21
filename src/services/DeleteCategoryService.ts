import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";

export class DeleteCategoryService {
  private prisma: PrismaClient;
  
  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient;
  }
 
  public async execute(categoryId: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id: categoryId }
    });
  }
}