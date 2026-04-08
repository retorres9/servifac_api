import { IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    strEmail!: string;
    @IsNotEmpty()
    strNewPassword!: string;
}