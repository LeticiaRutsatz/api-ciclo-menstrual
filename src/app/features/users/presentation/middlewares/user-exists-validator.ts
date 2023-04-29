import { NextFunction, Request, Response } from 'express';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import { UserRepository } from '../../infra/repositories/user.repository';
import { validate } from 'uuid';

export const userExistsValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const response = new ResponseHelper();
  const userRepository = new UserRepository();

  if (!id) {
    return response.badRequest('Please send a ID!', res);
  }

  if (!validate(id)) {
    return response.badRequest('this ID do not exist!', res);
  }

  const exists = await userRepository.getUserById(id);

  if (!exists) {
    return response.badRequest('This user do not exist!', res);
  }

  next();
};
