import { Contains, IsNotEmpty, Length } from "class-validator";

export class CreateProviderDto {
    @IsNotEmpty()
    @Length(13)
    public strRuc!: string;
    @IsNotEmpty()
    public strProviderName!: string;
    @IsNotEmpty()
    public strProviderBusinessName!: string;
    @IsNotEmpty()
    public strProviderDescription!: string;
    @IsNotEmpty()
    public strProviderContact!: string;
    @IsNotEmpty()
    public strProviderPhone!: string;
    @IsNotEmpty()
    @Contains('@')
    @Contains('.')
    public strProviderEmail!: string;
    @IsNotEmpty()
    public strProviderAddress!: string;
    @IsNotEmpty()
    public intUserId!: number;
}