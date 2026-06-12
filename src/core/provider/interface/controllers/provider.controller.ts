import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CreateProviderUseCase } from "../../application/use-cases/create-provider.usecase";
import { CreateProviderDto } from "../dto/create-provider.dto";

@Controller('providers')
export class ProviderController {
    constructor(
        private readonly createProviderUseCase: CreateProviderUseCase
    ) {}
    
    @Post()
    createProvider(@Body() entry: CreateProviderDto): Promise<any> {
        return this.createProviderUseCase.execute(entry);
    }

    @Post('search')
    searchProviders(@Body() criteria: any): Promise<any> {
        return this.createProviderUseCase.execute(criteria);
    }

    @Patch(':id')
    updateProvider(@Body() entry: CreateProviderDto, @Param('id') id: string): Promise<any> {
        return this.createProviderUseCase.execute(entry);
    }

    @Delete(':id')
    deleteProvider(@Param('id') id: string) {
        // Implement the logic to delete a provider by its ID
    }
}