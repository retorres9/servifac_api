import { IsInt } from "class-validator";
import { HeaderDto } from "src/common/models/header.dto";

export class GetStockByProductDto extends HeaderDto {
    @IsInt()
    productId!: number;
}