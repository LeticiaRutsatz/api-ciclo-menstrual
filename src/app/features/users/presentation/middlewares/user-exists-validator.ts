import { NextFunction, Request, Response } from 'express';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import { UserRepository } from '../../infra/repositories/user.repository';
import { validate } from 'uuid';

export const userExistsValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const response = new ResponseHelper();
  const userRepository = new UserRepository();

  if (!userId) {
    return response.badRequest('Please send a ID!', res);
  }

  if (!validate(userId)) {
    return response.badRequest('this ID do not exist!', res);
  }

  const exists = await userRepository.getUserById(userId);

  if (!exists) {
    return response.badRequest('This user do not exist!', res);
  }

  next();
};
