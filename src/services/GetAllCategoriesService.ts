import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";

export class GetAllCategoriesService {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async execute(userId: string) {
    const categories = await this.prisma.category.findMany({
      where: {
        userId: userId
      }
    });

    return categories;
  }
}