import { NextFunction, Request, Response } from 'express'
import { Prisma } from '../generated/prisma/client'
import { logger } from '../globals/logger'

type ApiError = {
  error: string
  message: string
  details?: unknown
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err?.toString() ?? 'Unknown error')
  
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handleKnownPrismaError(err, res)
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Invalid data'
    } satisfies ApiError)
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      error: 'DATABASE_ERROR',
      message: 'Database initialization failed'
    } satisfies ApiError)
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.code,
      message: err.message
    } satisfies ApiError)
  }


  return res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected error'
  } satisfies ApiError)
}

function handleKnownPrismaError(
  err: Prisma.PrismaClientKnownRequestError,
  res: Response
) {
  switch (err.code) {
    case 'P2002': {
      const fields = Array.isArray(err.meta?.target)
        ? err.meta.target.join(', ')
        : 'field'

      return res.status(409).json({
        error: 'RESOURCE_ALREADY_EXISTS',
        message: `Duplicate value for ${fields}`
      } satisfies ApiError)
    }

    case 'P2025':
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Resource not found'
      } satisfies ApiError)

    case 'P2003':
      return res.status(409).json({
        error: 'FOREIGN_KEY_CONSTRAINT',
        message: 'Invalid relation'
      } satisfies ApiError)

    case 'P2014':
      return res.status(409).json({
        error: 'RELATION_VIOLATION',
        message: 'Operation violates required relation'
      } satisfies ApiError)

    default:
      return res.status(400).json({
        error: 'PRISMA_ERROR',
        message: 'Database operation failed'
      } satisfies ApiError)
  }
}

export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    message: string
  ) {
    super(message)
  }
}
