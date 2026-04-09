import { IsNotEmpty, MinLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  strProductCode!: string;
  @IsNotEmpty()
  @MinLength(5)
  strProductName!: string;
  @IsNotEmpty()
  intMinQuantity!: number;
  @IsNotEmpty()
  intTypeOfTax!: number;
  @IsNotEmpty()
  intIdLocation!: number;
  @IsNotEmpty()
  intIdCategory!: number;
}
