import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { PasswordHasher } from "../globals/passwordHasher";
import { AppError } from "../middlewares/errorHandler";
import { TokenPair, TokenService } from "./TokenService";

export class RegisterService {
  private prisma: PrismaClient;
  private tokenService: TokenService;

  constructor(
    prismaClient: PrismaClient = prisma,
    tokenService: TokenService = new TokenService()
  ) {
    this.prisma = prismaClient;
    this.tokenService = tokenService;
  }

  public async execute(email: string, name: string, password: string): Promise<TokenPair> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("ALREADY_IN_USE", 409, "Already in use");
    }

    const hashedPassword = await PasswordHasher.hash(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const tokens = this.tokenService.generateTokens({
      sub: newUser.id,
      email: newUser.email,
    });

    return tokens;
  }
}