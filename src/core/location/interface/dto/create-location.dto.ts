import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @MinLength(4)
  strLocationName!: string;

  @IsNotEmpty()
  @MinLength(4)
  strLocationDescription!: string;

  @IsNumber()
  @Min(1)
  intWarehouse!: number;

  @IsNumber()
  @Min(1)
  intUserCreate!: number;
  
}
