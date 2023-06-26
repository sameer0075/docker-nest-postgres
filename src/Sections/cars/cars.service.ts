import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Cars } from 'src/entities/cars.entity';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { CarRequestDto } from './dto/request.dto';
import { CarResponseDto } from './dto/response.dto.ts';

@Injectable()
export class CarsService {
  private carsRep: BaseService<Cars>;
  private categoryrRep: BaseService<Categories>;
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {
    this.carsRep = new BaseService<Cars>(this.carsRepository);
    this.categoryrRep = new BaseService<Categories>(this.categoryRepository);
  }

  async create(body: CarRequestDto): Promise<CarResponseDto> {
    const data: Cars = await this.carsRep.save(body);
    const { id, name, description, model, make, color, registration_no } = data;
    const category_id: Categories = await this.categoryrRep.findOne({
      where: { id: body.category_id },
    });
    return new CarResponseDto(
      id,
      name,
      description,
      color,
      make,
      model,
      registration_no,
      category_id,
    );
  }

  async Count():Promise<any> {
    return this.carsRep.Count()
  }

  async findAll(
    user,
    pagination: {
      page: number;
      limit: number;
      offset: number;
    },
  ): Promise<CarResponseDto[]> {
    const data: Cars[] = await this.carsRep.findAll({
      select: [
        'id',
        'name',
        'description',
        'color',
        'make',
        'model',
        'registration_no',
      ],
      relations: ['category_id'],
      skip: pagination.offset,
      take: pagination.limit,
      order:{
        id:"DESC"
      }
    });
    return data;
  }

  async findOne(id: number, user): Promise<CarResponseDto> {
    const data: Cars = await this.carsRep.findOne({
      select: [
        'id',
        'name',
        'description',
        'color',
        'make',
        'model',
        'registration_no',
      ],
      relations: ['category_id'],
      where: { id },
    });
    if (data) {
      const {
        id,
        name,
        description,
        color,
        make,
        model,
        registration_no,
        category_id,
      } = data;
      return new CarResponseDto(
        id,
        name,
        description,
        color,
        make,
        model,
        registration_no,
        category_id,
      );
    } else {
      throw 'Category not found';
    }
  }

  async update(id: number, body: CarRequestDto): Promise<CarResponseDto> {
    await this.carsRep.update(id, body);
    const data: Cars = await this.carsRep.findOne({
      where: { id },
      relations: ['category_id'],
    });
    if (data) {
      const {
        id,
        name,
        description,
        color,
        make,
        model,
        registration_no,
        category_id,
      } = data;
      return new CarResponseDto(
        id,
        name,
        description,
        color,
        make,
        model,
        registration_no,
        category_id,
      );
    } else {
      throw 'Category not updated';
    }
  }

  async remove(id: number): Promise<void> {
    await this.carsRep.softDelete(id);
  }
}
