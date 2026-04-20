import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class StockMovementDto {
    @IsNotEmpty()
    strReference!: string;

    @IsNotEmpty()
    @IsNumber()
    intIdMovementType!: number;

    @IsOptional()
    strNote?: string;

    @Min(1)
    @IsNumber()
    intIdUser!: number;
}