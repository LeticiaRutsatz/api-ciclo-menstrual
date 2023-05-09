import { Response, Request } from 'express';
import { UserSharedRepository } from '../../../../shared/repositories';
import { BCryptPassword } from '../../../../shared/adapter/crypto';
import { JwtToken } from '../../../../shared/adapter/jwt';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const repository = new UserSharedRepository();
    const bcrypt = new BCryptPassword();
    const response = new ResponseHelper();

    try {
      const user = await repository.searchEmail(email, true);

      if (!user) {
        return res.status(401).json({
          message: 'Incorrect Email or password!',
          success: false,
        });
      }

      const correctPassword = await bcrypt.comparePassword(password, user.password as string);

      if (!correctPassword) {
        return res.status(401).json({
          message: 'Incorrect Email or password!',
          success: false,
        });
      }
      const jwtToken = new JwtToken();

      const token = jwtToken.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return res.status(200).json({
        message: 'Login successful!',
        data: { token, user: { id: user.id, name: user.name, email: user.email } },
        success: true,
      });
    } catch (err) {
      return response.error('Error creating Alarm!', res, err);
    }
  }
}
