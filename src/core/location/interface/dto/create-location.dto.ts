import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateLocationDto {
  intLocationId: number = 0;
  @IsNotEmpty()
  @MinLength(4)
  strLocationName!: string;
}
