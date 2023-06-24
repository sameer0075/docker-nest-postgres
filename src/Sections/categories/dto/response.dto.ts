export class CategoryResponseDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
