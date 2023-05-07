import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Flow } from '../../../../shared/domain/enums';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import { AlarmRepository } from '../../infra/repositories/alarm.repository';

export const alarmExitsCicleValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const response = new ResponseHelper();
  const alarmRepository = new AlarmRepository();

  const alarmExist = await alarmRepository.verifyAlarmExits(userId);

  if (alarmExist) {
    return response.badRequest('This account already have an alarm!', res);
  }

  next();
};
