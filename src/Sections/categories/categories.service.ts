import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import ShortUniqueId from 'short-unique-id';
import { BaseService } from 'src/common/services/base.service';
import { Cars } from 'src/entities/cars.entity';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { CategoryRequestDto } from './dto/request.dto';
import { CategoryResponseDto } from './dto/response.dto';
const uid = new ShortUniqueId({ length: 6 });

@Injectable()
export class CategoriesService {
  private categoryRep: BaseService<Categories>;
  private carsRep: BaseService<Cars>;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
  ) {
    this.categoryRep = new BaseService<Categories>(this.categoryRepository,Categories.name,this.cacheManager);
    this.carsRep = new BaseService<Cars>(this.carsRepository,Cars.name,this.cacheManager);
  }
  async create(body: CategoryRequestDto): Promise<CategoryResponseDto> {
    const unique_code = uid();
    Object.assign(body, { unique_code });
    const data: Categories = await this.categoryRep.save(body);
    const { id, name, description } = data;
    return new CategoryResponseDto(id, name, description);
  }

  async findAll(
    user,
    pagination: {
      page: number;
      limit: number;
      offset: number;
    },
  ): Promise<CategoryResponseDto[]> {
    const data: Categories[] = await this.categoryRep.findAll({
      select: ['id', 'name', 'description'],
      skip: pagination.offset,
      take: pagination.limit,
      order:{
        id:"DESC"
      }
    });
    const categoryResponse: CategoryResponseDto[] = data.map(category => 
      new CategoryResponseDto(category.id, category.name, category.description)
    );
  
    return categoryResponse;
  
  }

  async findOne(id: number, user): Promise<CategoryResponseDto> {
    const data: Categories = await this.categoryRep.findOne({
      select: ['id', 'name', 'description'],
      where: { id },
    });
    if (data) {
      const { id, name, description } = data;
      return new CategoryResponseDto(id, name, description);
    } else {
      throw 'Category not found';
    }
  }

  async update(
    id: number,
    body: CategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    await this.categoryRep.update(id, body);
    const data: Categories = await this.categoryRep.findOne({
      select: ['id', 'name', 'description'],
      where: { id },
    });
    if (data) {
      const { id, name, description } = data;
      return new CategoryResponseDto(id, name, description);
    } else {
      throw 'Category not updated';
    }
  }

  async remove(id: number): Promise<void> {
    await this.categoryRep.softDelete(id);
    await this.carsRep.softDelete({ category_id: id });
  }
}
