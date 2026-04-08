import { IsNotEmpty } from "class-validator";

export class RestorePasswordDto {
    @IsNotEmpty()
    strEmail!: string;

    @IsNotEmpty()
    strPassword!: string;

    @IsNotEmpty()
    strNewPassword!: string;
}