import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CreateProviderUseCase } from "../../application/use-cases/create-provider.usecase";
import { CreateProviderDto } from "../dto/create-provider.dto";
import { SearchProviderDto } from "../dto/search-provider.dto";
import { SearchProvidersUseCase } from "@core/provider/application/use-cases/search-providers.usecase";
import { DeleteProviderUseCase } from "@core/provider/application/use-cases/delete-provider.usecase";

@Controller('providers')
export class ProviderController {
    constructor(
        private readonly createProviderUseCase: CreateProviderUseCase,
        private readonly searchProvidersUseCase: SearchProvidersUseCase,
        private readonly deleteProviderUseCase: DeleteProviderUseCase
    ) {}
    
    @Post()
    createProvider(@Body() entry: CreateProviderDto): Promise<any> {
        return this.createProviderUseCase.execute(entry);
    }

    @Post('search')
    searchProviders(@Body() searchProviderDto: SearchProviderDto) {
        return this.searchProvidersUseCase.execute(searchProviderDto);
    }

    @Patch(':id')
    updateProvider(@Body() entry: CreateProviderDto, @Param('id') id: string): Promise<any> {
        return this.createProviderUseCase.execute(entry);
    }

    @Delete(':id')
    deleteProvider(@Param('id') id: string) {
        return this.deleteProviderUseCase.execute(id);
    }
}