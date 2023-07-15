import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarRequestDto } from './dto/request.dto';
import { CarResponseDto } from './dto/response.dto.ts';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoggedInUser } from 'src/common/helper/decorators/current-user.decorator';
import { Pagination } from 'src/common/helper/decorators/pagination.decorator';
import PostgreStatusCode from 'src/enums/PostgresErrorCode';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

@ApiBearerAuth('Authorization')
@ApiTags('Cars')
@ApiResponseTags()
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() body: CarRequestDto,
  ): Promise<CarResponseDto> {
    try {
      const data: CarResponseDto = await this.carsService.create(body);
      response.status(PostgreStatusCode.SuccessCode).send(data);
      return data;
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  @Get('count')
  async getCount(@Res() response: Response): Promise<any> {
    try {
      const data: any = await this.carsService.Count();
      response.status(HttpStatus.OK).send({ count: data });
      return data;
    } catch (err) {
      console.log(err);
      response
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: true, message: err });
    }
  }

  @Get()
  async findAll(
    @Pagination() pagination: { page: number; limit: number; offset: number },
    @Res() response: Response,
    @LoggedInUser() user,
  ): Promise<CarResponseDto[]> {
    try {
      const data: CarResponseDto[] = await this.carsService.findAll(
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
  ): Promise<CarResponseDto> {
    try {
      const data: CarResponseDto = await this.carsService.findOne(id);
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
    @Body() body: CarRequestDto,
  ): Promise<CarResponseDto> {
    try {
      const data: CarResponseDto = await this.carsService.update(id, body);
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
      await this.carsService.remove(id);
      response
        .status(PostgreStatusCode.SuccessCode)
        .send('Car Deleted Successfully');
    } catch (err) {
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }
}
