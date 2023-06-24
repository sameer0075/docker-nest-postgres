import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from 'src/entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from 'src/entities/cars.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Cars])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
