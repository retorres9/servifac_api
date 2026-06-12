import { PaginationDto } from "@common/models/pagination.dto";
import { IsInt, IsOptional, IsString } from "class-validator";

export class SearchProductDto extends PaginationDto{
    @IsOptional()
    @IsString()
    strProductCode?: string;
    @IsOptional()
    @IsString()
    strProductName?: string;
    @IsOptional()   
    @IsInt()
    intTypeOfTax?: number;
    @IsOptional()
    @IsInt()
    intIdLocation?: number;
    @IsOptional()
    @IsInt()
    intIdCategory?: number;
}