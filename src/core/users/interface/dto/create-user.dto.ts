import { IsEcuadorianId } from "@common/validator/isEcuadorianId.validator";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    strEmail!: string;
    @IsNotEmpty()
    @MinLength(6)
    strPassword!: string;
    @IsNotEmpty()
    strFirstName!: string;
    @IsNotEmpty()
    strLastName!: string;
    @IsEcuadorianId()
    strCi!: string;
    @IsNotEmpty()
    @MinLength(10)
    strPhone!: string;
    @IsNotEmpty()
    strAddress!: string;
    @IsNotEmpty()
    intRoleId!: number;
    @IsNotEmpty()
    strCity!: string;
    @IsNotEmpty()
    intRole!: number;
}