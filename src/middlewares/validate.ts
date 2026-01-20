import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);


  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }


    req.body = result.data;
    next();
  };
