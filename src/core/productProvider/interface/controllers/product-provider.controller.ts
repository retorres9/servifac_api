import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { CreateProviderDto } from "../dto/addProductProvider.dto";
import { CreateProcuctProviderUseCase } from "../../application/use-cases/addProductProvider.usecase";
import { UpdateProductProviderUseCase } from "../../application/use-cases/updateProductProvider.usecase";
import { GetAllProductProvidersUseCase } from "../../application/use-cases/getAllProdcutProviders.usecase";
import { GetProductByProviderUseCase } from "../../application/use-cases/getProductByProvider.usecase";

@Controller('product-providers')
export class ProductProviderController {
    constructor(
        private readonly createProductProviderUseCase: CreateProcuctProviderUseCase,
        private readonly updateProductProviderUseCase: UpdateProductProviderUseCase,
        private readonly getAllProductProvidersUseCase: GetAllProductProvidersUseCase,
        private readonly getProductProviderByIdUseCase: GetProductByProviderUseCase
    ) {}
    @Post()
    async createProductProvider(@Body() input: CreateProviderDto): Promise<void> {
        await this.createProductProviderUseCase.execute(input);
    }

    @Patch(':id')
    async updateProductProvider(@Body() input: CreateProviderDto, @Param('id') id: number): Promise<void> {
        await this.updateProductProviderUseCase.execute(id, input);
    }

    @Post('search')
    async getAllProductProviders(): Promise<any> {
        return await this.getAllProductProvidersUseCase.execute();
    }

    @Post('getById/:id')
    async getProductProviderById(@Param('id') id: number): Promise<any> {
        return await this.getProductProviderByIdUseCase.execute(id);
    }
}