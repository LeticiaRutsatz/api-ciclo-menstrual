import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Flow, Symptoms } from '../../../../shared/domain/enums';

export const createCicleValidator = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.body.flow === 'string') {
    req.body.flow = (req.body.flow as string).toUpperCase();
  }

  const dateType = z.string().refine((date) => dateRegex.test(date), {
    message: 'Invalid date, Enter a date in yyyy/mm/dd format ',
  });

  const flowEnum = z.nativeEnum(Flow).refine((val) => Object.values(Flow).includes(val as Flow), {
    message: "Flow must be 'Ligth', 'Moderate' or 'Intense'",
  });

  const dateRegex = /^20\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;

  const symptomsType = z.array(z.nativeEnum(Symptoms));

  const scheme = z.object({
    startDate: dateType,
    endDate: dateType,
    flow: flowEnum,
    symptoms: symptomsType.optional(),
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
