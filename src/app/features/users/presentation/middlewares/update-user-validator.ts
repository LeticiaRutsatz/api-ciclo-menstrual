import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';

export const updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const response = new ResponseHelper();

  if (req.body != password || email) {
    return response.badRequest('invalid Camp!', res);
  }

  const scheme = z
    .object({
      email: z.string().email().optional(),
      password: z.string().min(8).optional(),
    })
    .strip();

  try {
    const data = scheme.parse(req.body);
    Object.assign(req.body, data);
    return next();
  } catch (error) {
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
