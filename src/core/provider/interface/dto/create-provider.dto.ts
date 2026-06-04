import { IsEcuadorianId } from "@common/validator/isEcuadorianId.validator";
import { Contains, IsNotEmpty } from "class-validator";

export class CreateProviderDto {
    @IsEcuadorianId()
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