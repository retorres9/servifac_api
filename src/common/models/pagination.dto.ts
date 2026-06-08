import { IsNumber } from "class-validator";

export class PaginationDto {
    @IsNumber()
    intPage?: number;

    @IsNumber()
    intLimit?: number;
    
    strSearchTerm?: string;
    dtFromDate?: Date;
    dtToDate?: Date;
    strSortBy?: string;
    strSortOrder?: 'ASC' | 'DESC';
}