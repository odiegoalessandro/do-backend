import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";

export class DeleteUserService {
    private prisma: PrismaClient
    
    constructor(
        prismaClient: PrismaClient = prisma,
    ) {
        this.prisma = prismaClient
    }

  public async execute(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId }
    });
  }
}