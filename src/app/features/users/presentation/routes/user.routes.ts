import express from 'express';
import { UserController } from '../controllers';
import {
  createUserValidator,
  emailExistsValidator,
  updateUserValidator,
  userExistsValidator,
} from '../middlewares';
import { authValidator } from '../../../../shared/middlewares';

export default () => {
  const router = express.Router();
  router.post('/users', createUserValidator, new UserController().createUser);

  router.get('/users', authValidator, new UserController().getUsers);

  router.get('/users/:userId', userExistsValidator, new UserController().getUsers);

  router.put(
    '/users/:userId',
    authValidator,
    userExistsValidator,
    emailExistsValidator,
    updateUserValidator,
    new UserController().updateUser,
  );

  router.delete(
    '/users/:userId',
    authValidator,
    userExistsValidator,
    new UserController().deleteUserbyId,
  );

  return router;
};
