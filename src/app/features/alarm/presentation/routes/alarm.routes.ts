import express from 'express';
import { AlarmController } from '../controllers';
import { authValidator } from '../../../../shared/middlewares';
import { userExistsValidator } from '../../../users/presentation/middlewares';
import { createAlarmValidator } from '../middlewares';
import { alarmExitsCicleValidator } from '../middlewares/alarm-exists.validator';

export default () => {
  const router = express.Router();
  router.post(
    '/users/:userId/alarm',
    authValidator,
    userExistsValidator,
    alarmExitsCicleValidator,
    createAlarmValidator,
    new AlarmController().createAlarm,
  );

  router.get(
    '/users/:userId/alarm/:id',
    authValidator,
    userExistsValidator,
    new AlarmController().getAlarm,
  );

  router.get('/users/alarm', authValidator, new AlarmController().getAlarm);

  router.put(
    '/users/:userId/alarm/:id',
    authValidator,
    createAlarmValidator,
    userExistsValidator,
    new AlarmController().updateAlarm,
  );

  router.delete(
    '/users/:userId/alarm/:id',
    authValidator,
    userExistsValidator,
    new AlarmController().deleteAlarmbyId,
  );

  return router;
};
