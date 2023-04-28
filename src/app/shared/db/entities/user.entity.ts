import { Entity, Column, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { Symptoms } from './symptoms.entity';
import { Alarm } from './alarm.entity';
import { BaseEntity } from './base.entity';
import { Cicle } from './cicle.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ name: 'birth_date' })
  birthDate!: string;

  @Column()
  password!: string;

  @OneToMany(() => Cicle, (cicle) => cicle.user)
  cicles!: Cicle[];

  @ManyToMany((type) => Symptoms, (symptoms) => symptoms.users)
  symptoms!: Symptoms[];

  @OneToMany(() => Alarm, (alarm) => alarm.user)
  alarm!: Alarm[];
}
