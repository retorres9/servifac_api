import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateLocationDto {
  intLocationId: number;
  @IsNotEmpty()
  @MinLength(4)
  strLocationName: string;
}
