import { NextFunction, Request, Response } from 'express';
import { UserSharedRepository } from '../../../../shared/repositories';

export const emailExistsValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const repository = new UserSharedRepository();
  const exists = await repository.searchEmail(email);

  if (exists) {
    return res.status(404).json({
      message: 'email already in use!',
      success: true,
    });
  }

  next();
};
