import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'alarm' })
export class Alarm extends BaseEntity {
  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'alarm_time' })
  alarmTime!: string;

  @ManyToOne(() => User, (user) => user.alarm)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;
}
