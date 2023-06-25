import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Cars } from 'src/entities/cars.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cars, Categories])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
