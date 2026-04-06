import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    strEmail!: string;
    @IsNotEmpty()
    strPassword!: string;
}