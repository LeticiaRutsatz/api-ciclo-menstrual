import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Flow } from '../../../../shared/domain/enums';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import { CicleRepository } from '../../infra/repositories';

export const cicleExitsCicleValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { startDate, endDate, flow } = req.body;
  const response = new ResponseHelper();
  const cicleRepository = new CicleRepository();

  const cicleExist = await cicleRepository.verifyCicleExits({ userId, startDate, endDate, flow });

  if (cicleExist) {
    return response.badRequest('This cicle already exists in this account!', res);
  }

  next();
};
