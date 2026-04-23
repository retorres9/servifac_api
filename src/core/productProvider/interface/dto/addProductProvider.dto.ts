import { IsNumber, Min } from "class-validator";

export class CreateProviderDto {
    @IsNumber()
    @Min(1)
    public intIdProduct!: number;
    @IsNumber()
    @Min(1)
    public intIdProvider!: number;
    public strSupplierSku!: string
    @IsNumber()
    @Min(0.05)
    public intUnitPrice!: number;
    @IsNumber()
    @Min(0)
    public intLeadDays!: number;
    public isActive!: boolean;
}