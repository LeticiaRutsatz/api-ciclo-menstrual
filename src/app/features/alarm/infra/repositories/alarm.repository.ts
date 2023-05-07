import { AppDataSource } from '../../../../shared/db/data-source';
import { userCreatedDTO, userDTO, userUpdatedDTO } from '../../../../shared/domain/dtos/user';
import { Alarm, User } from '../../../../shared/db/entities';
import { alarmCreatedDTO, alarmDTO } from '../../../../shared/domain/dtos/alarm';
import { UUID } from 'crypto';

export class AlarmRepository {
  private _repository = AppDataSource.getRepository(Alarm);

  async saveNewAlarm(alarm: alarmDTO): Promise<alarmCreatedDTO> {
    const entity = this._repository.create({
      alarmTime: alarm.alarmTime,
      userId: alarm.userId,
    });

    await this._repository.save(entity);

    return {
      id: entity.id,
      userId: entity.userId,
      alarmTime: entity.alarmTime,
    };
  }

  async verifyAlarmExits(userId: string): Promise<boolean> {
    const exist = await this._repository.findOne({
      where: {
        userId: userId,
      },
    });

    return !!exist;
  }

  async getAllAlarms(): Promise<Alarm[]> {
    const entities = this._repository.find();

    return entities;
  }

  async getAlarmById(id: string): Promise<Alarm | null> {
    const entity = this._repository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return entity;
  }

  async updateAlarm(alarm: alarmDTO, id: string): Promise<alarmCreatedDTO | null> {
    await this._repository.update(id, {
      userId: alarm.userId,
      alarmTime: alarm.alarmTime,
    });
    const entity = this._repository.findOneBy({ id: id });
    return entity;
  }

  async deleteAlarmbyId(id: string): Promise<any> {
    const alarmDeleted = await this._repository.delete(id);
    return alarmDeleted;
  }
}
