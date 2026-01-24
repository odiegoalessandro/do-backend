import { prisma } from "../config/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { PasswordHasher } from "../globals/passwordHasher";
import { AppError } from "../middlewares/errorHandler";
import { TokenPair, TokenService } from "./TokenService";

export class LoginService {
  private prisma: PrismaClient;
  private tokenService: TokenService;

  constructor(
    prismaClient: PrismaClient = prisma,
    tokenService: TokenService = new TokenService()
  ) {
    this.prisma = prismaClient;
    this.tokenService = tokenService;
  }

  public async execute(email: string, password: string): Promise<TokenPair> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("INVALID_CREDENTIALS", 401, "Invalid email or password");
    }

    if (!PasswordHasher.compare(password, user.password)) {
      throw new AppError("INVALID_CREDENTIALS", 401, "Invalid email or password");
    }

    const tokens = this.tokenService.generateTokens({
      sub: user.id,
      email: user.email,
    });

    return tokens;
  }
}