import { Response, Request } from 'express';
import { BCryptPassword } from '../../../../shared/adapter/crypto';
import { UserSharedRepository } from '../../../../shared/repositories';
import { UserRepository } from '../../infra/repositories/user.repository';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import 'dotenv/config';

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, birthDate } = req.body;
    const bcrypt = new BCryptPassword();
    const userRepositoryShared = new UserSharedRepository();
    const userRepository = new UserRepository();
    const response = new ResponseHelper();

    try {
      const hashPassword = await bcrypt.hashPassword(password);
      const requestUser = { name, email, password: hashPassword, birthDate };

      const exists = await userRepositoryShared.searchEmail(email);

      if (exists) {
        return response.badRequest('Email already in use!', res);
      }

      const user = await userRepository.saveNewUser(requestUser);
      return response.success('User created successfully!', res, user);
    } catch (err) {
      return response.error('Error creating user!', res, err);
    }
  }

  async getUsers(req: Request, res: Response) {
    const { userId } = req.params;
    const userRepository = new UserRepository();
    const response = new ResponseHelper();

    try {
      if (!userId) {
        if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
          return response.badRequest('You do not have the necessary access!', res);
        }

        const users = await userRepository.getAllUsers();
        return response.success('All users from the application!', res, users);
      }

      const user = await userRepository.getUserById(userId);

      if (!user) {
        return response.badRequest('this ID do not exist!', res, userId);
      }

      return response.success('User search with success!', res, user);
    } catch (err) {
      return response.error('Error getting users!', res, err);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { email, password } = req.body;
    const bcrypt = new BCryptPassword();
    const userRepository = new UserRepository();
    const response = new ResponseHelper();

    try {
      const user = await userRepository.getUserById(userId);

      const userUpdate = await userRepository.updateUser(
        {
          password: password ? await bcrypt.hashPassword(password) : password,
          email: email ? email : user?.email,
        },
        user!.id,
      );

      if (!userUpdate) {
        return response.badRequest('User not updated!', res);
      }

      return response.success('User updated with success!', res, userUpdate);
    } catch (err) {
      return response.error('Error updating user!', res, err);
    }
  }

  async deleteUserbyId(req: Request, res: Response) {
    const { userId } = req.params;
    const response = new ResponseHelper();
    const userRepository = new UserRepository();

    if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
      return response.badRequest('You do not have the necessary access!', res);
    }

    try {
      const userDeleted = await userRepository.getUserById(userId);
      await userRepository.deleteUserbyId(userId);
      return response.success('User deleted!', res, userDeleted);
    } catch (err) {
      return response.error('Error deleting user!', res, err);
    }
  }
}
