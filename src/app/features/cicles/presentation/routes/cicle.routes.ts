import express from 'express';
import { CicleController } from '../controllers/cicle.controller';
import { createCicleValidator } from '../middlewares';

export default () => {
  const router = express.Router();
  router.post('/cicles', createCicleValidator, new CicleController().createCicle);

  return router;
};
