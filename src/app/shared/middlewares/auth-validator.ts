import { NextFunction, Request, Response } from 'express';
import { ResponseHelper } from '../adapter/http.helper';
import { JwtToken } from '../adapter/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';

export const authValidator = (req: Request, res: Response, next: NextFunction) => {
  const response = new ResponseHelper();
  const jwt = new JwtToken();
  const authorization = req.headers.authorization;

  if (!authorization) {
    return response.badRequest('Please inform a token!', res);
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return response.badRequest('Invalid Token!', res);
  }

  try {
    const auth = jwt.verify(token);
    if (!auth) {
      return response.badRequest('Sorry, you are not authorized!', res);
    }

    req.user = { id: auth.id, email: auth.email };

    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return response.badRequest('UNAUTHORIZED Token!', res);
    }
    throw error;
  }
};
