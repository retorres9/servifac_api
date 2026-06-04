import { IsEcuadorianId } from "@common/validator/isEcuadorianId.validator";
import { Contains, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateCustomerDto {
    @IsEcuadorianId()
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