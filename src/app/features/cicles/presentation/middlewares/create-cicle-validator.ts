import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Flow } from '../../../../shared/domain/enums';

export const createCicleValidator = (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate, symptoms, notes, flow } = req.body;

  if (typeof req.body.flow === 'string') {
    req.body.flow = (req.body.flow as string).toUpperCase();
  }

  const dateType = z.string().refine((date) => dateRegex.test(date), {
    message: 'Invalid date, Enter a date in dd/mm/yyyy format ',
  });

  const flowEnum = z.nativeEnum(Flow).refine((val) => Object.values(Flow).includes(val as Flow), {
    message: "Flow must be 'Ligth', 'Moderate' or 'Intense'",
  });

  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const scheme = z.object({
    startDate: dateType,
    endDate: dateType,
    symptoms: z.string().max(50),
    notes: z.string().max(150),
    flow: flowEnum,
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
