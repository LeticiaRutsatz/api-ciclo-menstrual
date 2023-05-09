import { Response, Request } from 'express';
import { BCryptPassword } from '../../../../shared/adapter/crypto';
import { UserSharedRepository } from '../../../../shared/repositories';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import 'dotenv/config';
import { AlarmRepository } from '../../infra/repositories/alarm.repository';

export class AlarmController {
  async createAlarm(req: Request, res: Response) {
    const { alarmTime } = req.body;
    const { userId } = req.params;
    const response = new ResponseHelper();
    const alarmRepository = new AlarmRepository();

    try {
      const newAlarm = { userId, alarmTime };
      const alarm = await alarmRepository.saveNewAlarm(newAlarm);
      return response.success('Alarm created successfully!', res, alarm);
    } catch (err) {
      return response.error('Error creating Alarm!', res, err);
    }
  }

  async getAlarm(req: Request, res: Response) {
    const { userId, id } = req.params;
    const response = new ResponseHelper();
    const alarmRepository = new AlarmRepository();

    try {
      if (!id && !userId) {
        if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
          return response.badRequest('You do not have the necessary access!', res);
        }

        const alarms = await alarmRepository.getAllAlarms();
        return response.success('All alarms from the application!', res, alarms);
      }

      const alarm = await alarmRepository.getAlarmById(id);

      if (!alarm) {
        return response.badRequest('this ID do not exist!', res, id);
      }

      return response.success('Alarm search with success!', res, alarm);
    } catch (err) {
      return response.error('Error getting alarm!', res, err);
    }
  }

  async updateAlarm(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { alarmTime } = req.body;
    const response = new ResponseHelper();
    const alarmRepository = new AlarmRepository();

    try {
      const alarmUpdate = await alarmRepository.updateAlarm({ userId, alarmTime }, id);

      if (!alarmUpdate) {
        return response.badRequest('Alarm not updated!', res);
      }

      return response.success('Alarm updated with success!', res, alarmUpdate);
    } catch (err) {
      return response.error('Error updating Alarm!', res, err);
    }
  }

  async deleteAlarmbyId(req: Request, res: Response) {
    const { userId, id } = req.params;
    const response = new ResponseHelper();
    const alarmRepository = new AlarmRepository();

    try {
      const alarmDeleted = await alarmRepository.getAlarmById(id);
      await alarmRepository.deleteAlarmbyId(id);
      return response.success('Alarm deleted!', res, alarmDeleted);
    } catch (err) {
      return response.error('Error deleting alarm!', res, err);
    }
  }
}
