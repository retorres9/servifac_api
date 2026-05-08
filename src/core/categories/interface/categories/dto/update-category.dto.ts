import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class UpdateCategoryDto {
    @IsNumber()
    intId!: number;
    @IsNotEmpty()
    @MinLength(4)
    strCategoryName!: string;

    @IsNotEmpty()
    @MinLength(10)
    strCategoryDescription!: string;

    @IsNotEmpty()
    @IsNumber()
    intUserId!: number;
}
