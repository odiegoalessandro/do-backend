import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { UserCreateInput } from "../generated/prisma/models";
import { PasswordHasher } from "../globals/passwordHasher";
import { RegisterCredentials, User } from "../interfaces/user";


export class CreateUserService {
  private prisma: PrismaClient

  constructor(
    prismaClient: PrismaClient = prisma,
  ) {
    this.prisma = prismaClient
  }
  
  public async execute({ email, password, name }: RegisterCredentials): Promise<User> {
    const hashedPassword = await PasswordHasher.hash(password);

    const newUser: UserCreateInput = {
      email,
      password: hashedPassword,
      name
    }

    return await this.prisma.user.create({
      data: newUser
    })
  }
}