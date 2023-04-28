import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'alarm' })
export class Alarm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  receiveNotifications!: boolean;

  @Column()
  alarmTime!: number;

  @ManyToOne(() => User, (user) => user.alarm)
  user!: User;
}
