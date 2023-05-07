import { DataSource } from 'typeorm';
import { Alarm, Cicle, User } from './entities';
import 'dotenv/config';
import migrations from './migrations';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  entities: [User, Cicle, Alarm],
  migrations,
});
