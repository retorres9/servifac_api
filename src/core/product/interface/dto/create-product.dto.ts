import { IsNotEmpty, MinLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  strProductCode!: number;
  @IsNotEmpty()
  @MinLength(5)
  strProductName!: string;
  @IsNotEmpty()
  dblPrice!: number;
  @IsNotEmpty()
  dblPvPrice!: number;
  @IsNotEmpty()
  dblRetailPrice!: number;
  @IsNotEmpty()
  intQuantityAvailable!: number;
  @IsNotEmpty()
  intMinQuantity!: number;
  @IsNotEmpty()
  intTypeOfTax!: number;
  @IsNotEmpty()
  mnyProfitMargin!: number;
  @IsNotEmpty()
  intIdLocation!: number;
  @IsNotEmpty()
  intIdCategory!: number;
}
