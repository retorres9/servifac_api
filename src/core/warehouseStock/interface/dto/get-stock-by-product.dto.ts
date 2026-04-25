import { IsInt } from "class-validator";
import { HeaderDto } from "@common/models/header.dto";

export class GetStockByProductDto extends HeaderDto {
    @IsInt()
    productId!: number;
}