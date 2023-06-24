import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Cars } from './cars.entity';

@Entity({ name: 'categories' })
export class Categories {
  @PrimaryGeneratedColumn() id!: number;

  @Column()
  name!: string;

  @Column({ default: null })
  description: string;

  @Column({ unique: true })
  unique_code!: string;

  @OneToMany(() => Cars, (car) => car.category_id)
  carId!: Cars;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at!: Date;
}
