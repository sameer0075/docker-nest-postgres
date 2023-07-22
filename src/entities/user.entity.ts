import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn() id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  is_super_user: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: null })
  otp: string;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at!: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
