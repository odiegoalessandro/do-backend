import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const postgresAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prismaClient = new PrismaClient({
  adapter: postgresAdapter,
})

class Prisma {
  private static instance: PrismaClient

  static get client(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = prismaClient
    }
    return Prisma.instance
  }
}

export const prisma = Prisma.client
