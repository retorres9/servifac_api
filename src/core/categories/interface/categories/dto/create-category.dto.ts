import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  intId: number;
  @IsNotEmpty()
  @MinLength(4)
  strCategoryName: string;
}
