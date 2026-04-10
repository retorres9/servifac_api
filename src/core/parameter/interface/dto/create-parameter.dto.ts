import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateParameterDto {
    @IsNotEmpty()
    strName!: string;

    @IsNotEmpty()
    strNemonic!: string;
    
    @IsNotEmpty()
    strValue!: string;

    @IsNotEmpty()
    strDescription!: string;

    @IsNotEmpty()
    @IsBoolean()
    blIsActive!: boolean;
}
    