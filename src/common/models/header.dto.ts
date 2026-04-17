import { IsInt, IsString } from "class-validator";

export class HeaderDto {
    @IsInt()
    userID!: number;
    @IsInt()
    warehouseId!: number;
    @IsString()
    lat!: string;
    @IsString()
    long!: string;
};