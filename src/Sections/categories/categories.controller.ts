import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryRequestDto } from './dto/request.dto';
import { CategoryResponseDto } from './dto/response.dto';
import { Response } from 'express';
import PostgreStatusCode from 'src/enums/PostgresErrorCode';
import { Pagination } from 'src/common/helper/decorators/pagination.decorator';
import { LoggedInUser } from 'src/common/helper/decorators/current-user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

@ApiBearerAuth('Authorization')
@ApiTags('Categories')
@ApiResponseTags()
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() body: CategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    try {
      const data: CategoryResponseDto = await this.categoriesService.create(
        body,
      );
      response.status(PostgreStatusCode.SuccessCode).send(data);
      return data;
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  @Get()
  async findAll(
    @Pagination() pagination: { page: number; limit: number; offset: number },
    @Res() response: Response,
    @LoggedInUser() user,
  ): Promise<CategoryResponseDto[]> {
    try {
      const data: CategoryResponseDto[] = await this.categoriesService.findAll(
        user,
        pagination,
      );
      response.status(PostgreStatusCode.SuccessCode).send(data);
      return data;
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  @Get(':id')
  async findOne(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
    @LoggedInUser() user,
  ): Promise<CategoryResponseDto> {
    try {
      const data: CategoryResponseDto = await this.categoriesService.findOne(
        id,
        user,
      );
      response.status(PostgreStatusCode.SuccessCode).send(data);
      return data;
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    try {
      const data: CategoryResponseDto = await this.categoriesService.update(
        id,
        body,
      );
      response.status(PostgreStatusCode.SuccessCode).send(data);
      return data;
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      await this.categoriesService.remove(id);
      response
        .status(PostgreStatusCode.SuccessCode)
        .send('Category Deleted Successfully');
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }
}
