import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export const createAlarmValidator = (req: Request, res: Response, next: NextFunction) => {
  const timeType = z.string().refine((time) => timeRegex.test(time), {
    message: 'Invalid time, Enter a time in HH:MM:SS format ',
  });

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  const scheme = z.object({
    alarmTime: timeType,
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
