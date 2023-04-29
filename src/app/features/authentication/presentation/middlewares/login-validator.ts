import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export const loginUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const scheme = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
  });

  try {
    const data = scheme.parse(req.body);
    Object.assign(req.body, data);
    return next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.issues.map((issue) => ({
          campo: issue.path[0],
          mensagem: issue.message,
          codigo: issue.code,
        })),
      });
    }
    throw error;
  }
};
