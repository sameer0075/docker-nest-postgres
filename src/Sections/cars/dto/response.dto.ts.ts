import { Categories } from 'src/entities/categories.entity';

export class CarResponseDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly make: string;
  readonly model: string;
  readonly registration_no: string;
  readonly category_id: Categories;

  constructor(
    id: number,
    name: string,
    description: string,
    color: string,
    make: string,
    model: string,
    registration_no: string,
    category_id: Categories,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
    this.make = make;
    this.model = model;
    this.registration_no = registration_no;
    this.category_id = category_id;
  }
}
