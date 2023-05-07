import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Flow, Symptoms } from '../../domain/enums';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'cicles' })
export class Cicle extends BaseEntity {
  @Column({ name: 'start_date' })
  startDate!: string;

  @Column({ name: 'end_date' })
  endDate!: string;

  @Column()
  duration!: string;

  @Column({ name: 'fertile_days' })
  fertileDays!: string;

  @Column({ name: 'ovulation_days' })
  ovulationDay!: string;

  @Column({ type: 'enum', enum: Flow })
  flow!: Flow;

  @Column({ nullable: true })
  symptoms!: string; // Altere o tipo para SymptomsArray

  @Column({ name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.cicles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;
}
