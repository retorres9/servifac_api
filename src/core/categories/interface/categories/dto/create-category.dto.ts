import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(4)
  strCategoryName!: string;

  @IsNotEmpty()
  @MinLength(10)
  strCategoryDescription!: string;

  @IsNotEmpty()
  intUserId!: number;
}
