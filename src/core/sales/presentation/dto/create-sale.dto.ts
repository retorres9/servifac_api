import { HeaderDto } from "@common/models/header.dto";
import { IsString, IsInt, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

class SaleLineDto {
    @IsInt()
    productId!: number;

    @IsInt()
    quantity!: number;

    @IsInt()
    unitPrice!: number;

    @IsOptional()
    @IsInt()
    discount?: number;
}

export class CreateSaleDto extends HeaderDto {
    @IsOptional()
    @IsInt()
    customerId?: number;

    @IsOptional()
    @IsString()
    idempotencyKey?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleLineDto)
    lines!: SaleLineDto[];
}