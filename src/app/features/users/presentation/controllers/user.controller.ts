import { Response, Request } from 'express';
import { BCryptPassword } from '../../../../shared/adapter/crypto';
import { UserSharedRepository } from '../../../../shared/repositories';
import { UserRepository } from '../../infra/repositories/user.repository';

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, birthDate } = req.body;
    const bcrypt = new BCryptPassword();
    const userRepositoryShared = new UserSharedRepository();
    const userRepository = new UserRepository();

    const hashPassword = await bcrypt.hashPassword(password);
    const requestUser = { name, email, password: hashPassword, birthDate };

    const exists = await userRepositoryShared.searchEmail(email);

    if (exists) {
      return res.status(404).json({
        message: 'email already in use!',
        success: false,
      });
    }

    try {
      const user = await userRepository.saveNewUser(requestUser);

      return res.status(201).json({
        message: 'User created successfully!',
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating user',
        success: false,
        error: error,
      });
    }
  }
}
