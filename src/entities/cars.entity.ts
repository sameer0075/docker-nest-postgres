import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Categories } from './categories.entity';

@Entity({ name: 'cars' })
export class Cars {
  @PrimaryGeneratedColumn() id!: number;

  @Column()
  name!: string;

  @Column({ default: null })
  description: string;

  @Column()
  color!: string;

  @Column()
  model!: string;

  @Column()
  make!: string;

  @Column()
  registration_no!: string;

  @ManyToOne(() => Categories, (category) => category.carId)
  @JoinColumn({ name: 'category_id' })
  category_id!: Categories;

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
