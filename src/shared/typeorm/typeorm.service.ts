import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  /**
   * @description configurations related to DB ;
   * @returns TypeOrmModuleOptions ;
   */
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    dotenv.config();
    console.log('config test', process.env.DATABASE_URL);
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: false,
      migrations: ['src/database/migrations/*.{ts,js}'],
      migrationsTableName: 'migration',
    };
  }
}
