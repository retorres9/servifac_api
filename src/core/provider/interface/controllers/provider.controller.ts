import { Body, Controller, Post } from "@nestjs/common";
import { CreateProviderUseCase } from "../../application/use-cases/create-provider.usecase";
import { CreateProviderDto } from "../dto/create-provider.dto";

@Controller()
export class ProviderController {
    constructor(
        private readonly createProviderUseCase: CreateProviderUseCase
    ) {}
    
    @Post('new')
    createProvider(@Body() entry: CreateProviderDto): Promise<any> {
        return this.createProviderUseCase.execute(entry);
    }
}