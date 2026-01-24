import jwt, { SignOptions } from 'jsonwebtoken'
import { Env } from '../globals/env'

type JwtPayload = {
  sub: string
  email?: string
}

export type TokenPair = {
  accessToken: string
  refreshToken: string
}

export class TokenService {
  private accessSecret = Env.JWT_ACCESS_SECRET
  private refreshSecret = Env.JWT_REFRESH_SECRET

  private accessOptions: SignOptions = {
    expiresIn: '15m',
  }

  private refreshOptions: SignOptions = {
    expiresIn: '30d',
  }

  generateTokens(payload: JwtPayload): TokenPair {
    const accessToken = jwt.sign(payload, this.accessSecret, this.accessOptions)
    const refreshToken = jwt.sign(
      { sub: payload.sub },
      this.refreshSecret,
      this.refreshOptions
    )

    return { accessToken, refreshToken }
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.accessSecret)
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, this.refreshSecret)
  }

  refreshTokens(refreshToken: string): TokenPair {
    const decoded = jwt.verify(refreshToken, this.refreshSecret) as jwt.JwtPayload

    return this.generateTokens({
      sub: decoded.sub as string,
    })
  }
}
