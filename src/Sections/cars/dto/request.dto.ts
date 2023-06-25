import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CarRequestDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  registration_no: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
