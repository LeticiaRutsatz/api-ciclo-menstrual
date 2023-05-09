import app from './main/config/app';
import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './app/shared/db/data-source';

const port = process.env.PORT || 8080;

AppDataSource.initialize().then(() => {
  app.listen(port, () => console.log('listening on port ' + port));
});
