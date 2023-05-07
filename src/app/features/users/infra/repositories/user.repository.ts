import { AppDataSource } from '../../../../shared/db/data-source';
import { userCreatedDTO, userDTO, userUpdatedDTO } from '../../../../shared/domain/dtos/user';
import { User } from '../../../../shared/db/entities';

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

  async getAllUsers(): Promise<User[]> {
    const entities = this._repository.find();

    return entities;
  }

  async getUserById(idUser: string): Promise<User | null> {
    const entity = this._repository.findOneBy({ id: idUser });

    if (!entity) {
      return null;
    }

    return entity;
  }

  async updateUser(user: userUpdatedDTO, id: string): Promise<userUpdatedDTO | null> {
    console.log(user);
    await this._repository.update(id, {
      email: user.email,
      password: user.password,
    });
    const entity = this._repository.findOneBy({ id: id });
    return entity;
  }

  async deleteUserbyId(id: string): Promise<any> {
    const userDeleted = await this._repository.delete(id);
    return userDeleted;
  }
}
