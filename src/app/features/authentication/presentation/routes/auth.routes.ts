import express from 'express';
import { loginUserValidator } from '../middlewares';
import { UserSharedRepository } from '../../../../shared/repositories';
import { AuthController } from '../controllers';

export default () => {
  const router = express.Router();
  router.post('/login', loginUserValidator, new AuthController().login);

  return router;
};
