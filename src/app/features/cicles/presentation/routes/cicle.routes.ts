import express from 'express';
import { CicleController } from '../controllers/cicle.controller';
import { createCicleValidator } from '../middlewares';
import { authValidator } from '../../../../shared/middlewares';
import { cicleExitsCicleValidator } from '../middlewares/cicle-exists-validator';

export default () => {
  const router = express.Router();
  router.post(
    '/users/:userId/cicles',
    authValidator,
    cicleExitsCicleValidator,
    createCicleValidator,
    new CicleController().createCicle,
  );

  router.get('/users/:userId/cicles', authValidator, new CicleController().getCicles);

  router.get('/users/:userId/cicles/:id', authValidator, new CicleController().getCicles);

  router.delete('/users/:userId/cicles/:id', authValidator, new CicleController().deleteCiclebyId);

  return router;
};
