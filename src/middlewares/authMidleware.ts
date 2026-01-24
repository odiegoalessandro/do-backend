import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from '../config/prisma'
import { UserWithoutPassword } from '../interfaces/user'

declare global {
  namespace Express {
    interface Request {
      user?: UserWithoutPassword
    }
  }
}

export function authMiddleware(
  secret: string,
) {
  const prismaClient = prisma

  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
      const token = auth.slice(7)
      const { sub } = jwt.verify(token, secret) as JwtPayload

      const user = await prismaClient.user.findUnique({ where: { id: sub } })

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const sanitizedUser: UserWithoutPassword | null = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        createdAt: user?.createdAt || new Date(),
        updatedAt: user?.updatedAt || new Date(),
      }

      req.user = sanitizedUser

      next()
    } catch {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}