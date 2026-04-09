import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  intId: number = 0;
  @IsNotEmpty()
  @MinLength(4)
  strCategoryName!: string;
}
