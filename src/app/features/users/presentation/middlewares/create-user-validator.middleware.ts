import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';

export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const dateType = z.string().refine((date) => dateRegex.test(date), {
    message: 'Invalid date, Enter a date in dd/mm/yyyy format ',
  });

  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const scheme = z
    .object({
      name: z.string().nonempty(),
      email: z.string().email(),
      password: z.string().min(8),
      birthDate: dateType,
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
