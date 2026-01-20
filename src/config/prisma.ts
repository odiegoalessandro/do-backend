import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/extension";

const postgresAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

export const prismaClient = new PrismaClient({
  postgresAdapter
});