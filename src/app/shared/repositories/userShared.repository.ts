import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { User } from '../db/entities';
import { userDTO } from '../domain/dtos';

export class UserSharedRepository {
  private _repository = AppDataSource.getRepository(User);

  async searchEmail(email: string, options?: boolean) {
    const user = await this._repository.findOneBy({ email });

    if (!user) return undefined;
    return this.mapperToUserDetail(user, options);
  }

  private mapperToUserDetail(entity: User, options?: boolean) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: options != null && options ? entity.password : undefined,
    };
  }
}
