import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class PaginationDto {
    @IsNumber()
    intPage?: number;

    @IsNumber()
    intLimit?: number;
    
    strSearchTerm?: string;
    @Type(() => Date)
    dtFromDate?: Date;
    @Type(() => Date)
    dtToDate?: Date;
    strSortBy?: string;
    strSortOrder?: 'ASC' | 'DESC';
}