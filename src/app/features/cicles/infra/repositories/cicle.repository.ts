import { AppDataSource } from '../../../../shared/db/data-source';
import { Cicle } from '../../../../shared/db/entities';
import { cicleCreatedDTO, cicleDTO, cicleUseCase } from '../../../../shared/domain/dtos/cicle';
import { Symptoms } from '../../../../shared/domain/enums';

export class CicleRepository {
  private _repository = AppDataSource.getRepository(Cicle);

  async saveNewCicle(cicle: cicleDTO): Promise<cicleCreatedDTO> {
    const entity = this._repository.create({
      startDate: cicle.startDate,
      endDate: cicle.endDate,
      flow: cicle.flow,
      symptoms: cicle.symptoms,
      duration: cicle.duration,
      fertileDays: cicle.fertileDays,
      ovulationDay: cicle.ovulationDay,
      userId: cicle.userId,
    });

    await this._repository.save(entity);

    return {
      id: entity.id,
      userId: entity.userId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      flow: entity.flow,
      symptoms: entity.symptoms as Symptoms,
      duration: entity.duration,
      fertileDays: entity.fertileDays,
      ovulationDay: entity.ovulationDay,
    };
  }

  async verifyCicleExits(cicle: cicleUseCase): Promise<boolean> {
    const exist = await this._repository.findOne({
      where: {
        userId: cicle.userId,
        startDate: cicle.startDate,
        endDate: cicle.endDate,
      },
    });

    return !!exist;
  }

  async getAllCicles(): Promise<Cicle[]> {
    const entities = this._repository.find();

    return entities;
  }

  async getCicleById(id: string, userId: string): Promise<Cicle | null> {
    const entity = this._repository.findOneBy({ id, userId });

    if (!entity) {
      return null;
    }

    return entity;
  }

  async deleteCiclebyId(id: string): Promise<any> {
    const cicleDeleted = await this._repository.delete(id);
    return cicleDeleted;
  }
}
