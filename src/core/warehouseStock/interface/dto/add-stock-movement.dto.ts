import { IsDecimal, IsInt, IsOptional, Min } from "class-validator";

export class AddStockMovementDto {
    @IsInt()
    @Min(1)
    productId!: number;

    @IsInt()
    @Min(1)
    locationId!: number;

    @IsInt()
    @Min(1)
    warehouseId!: number;

    @IsInt()
    @Min(1)
    quantity!: number;

    @IsDecimal()
    @Min(0.01)
    unitCost!: number;

    @IsOptional()
    @Min(1)
    reservedQty?: number;

    @IsOptional()
    unityOfMeasure?: string;

    @IsOptional()
    @Min(0.01)
    discount?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    minimumStock?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    maximumStock?: number;
}