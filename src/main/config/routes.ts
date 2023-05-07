import { Express } from 'express';
import userRoutes from '../../app/features/users/presentation/routes/user.routes';
import cicleRoutes from '../../app/features/cicles/presentation/routes/cicle.routes';
import loginRoutes from '../../app/features/authentication/presentation/routes/auth.routes';
import alarmRoutes from '../../app/features/alarm/presentation/routes/alarm.routes';

export default (app: Express) => {
  app.get('/', (req, res) => res.status(200).json('API is runing!'));
  app.use(userRoutes());
  app.use(cicleRoutes());
  app.use(loginRoutes());
  app.use(alarmRoutes());
};
