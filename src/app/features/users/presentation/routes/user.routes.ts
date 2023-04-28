import express from 'express';
import { UserController } from '../controllers';
import { createUserValidator } from '../middlewares';
import { emailExistsValidator } from '../middlewares/email-exists-validator.middlewares';

export default () => {
  const router = express.Router();
  router.post('/users', createUserValidator, new UserController().createUser);

  return router;
};
