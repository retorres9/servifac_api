import { Contains, IsNotEmpty, IsNumber, Length, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(13)
    strCi!: string;
    @IsNotEmpty()
    strName!: string;
    @IsNotEmpty()
    strLastName!: string;
    @IsNotEmpty()
    @Contains('@', { message: 'Email must contain @' })
    @Contains('.', { message: 'Email must contain .' })
    strEmail!: string;
    @IsNotEmpty()
    @Length(9, 10)
    strPhone!: string;
    @IsNotEmpty()
    strAddress!: string;
    @IsNotEmpty()
    @IsNumber()
    intIdWarehouse!: number;
}