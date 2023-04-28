import { AppDataSource } from '../../../../shared/db/data-source';
import { userCreatedDTO, userDTO } from '../../../../shared/domain/dtos';
import { User } from '../../../../shared/db/entities/user.entity';

export class UserRepository {
  private _repository = AppDataSource.getRepository(User);

  async saveNewUser(user: userDTO): Promise<userCreatedDTO> {
    const entity = this._repository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
    });

    await this._repository.save(entity);

    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      birthDate: entity.birthDate,
    };
  }
}
