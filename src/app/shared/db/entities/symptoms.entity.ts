import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'symptoms' })
export class Symptoms {
  @PrimaryGeneratedColumn()
  id!: 'uuid';

  @Column()
  name!: string;

  @ManyToMany((type) => User, (user) => user.symptoms)
  @JoinTable({
    name: 'symptoms_user',
    joinColumn: { name: 'sintoma_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users!: User[];
}
