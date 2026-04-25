import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductProvider } from "./infrastructure/typeorm/product-provider.entity";
import { PRODUCT_PROVIDER_REPOSITORY } from "./domain/interfaces/productProvider.interface";
import { ProductProviderRepository } from "./infrastructure/typeorm/product-provider.repository";
import { UpdateProductProviderUseCase } from "./application/use-cases/updateProductProvider.usecase";
import { GetAllProductProvidersUseCase } from "./application/use-cases/getAllProdcutProviders.usecase";
import { GetProductByProviderUseCase } from "./application/use-cases/getProductByProvider.usecase";
import { CreateProcuctProviderUseCase } from "./application/use-cases/addProductProvider.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductProvider])
    ],
    controllers: [],
    providers: [
        {
            provide: PRODUCT_PROVIDER_REPOSITORY,
            useClass: ProductProviderRepository
        },
        CreateProcuctProviderUseCase,
        GetProductByProviderUseCase,
        GetAllProductProvidersUseCase,
        UpdateProductProviderUseCase,
    ],
    exports: [PRODUCT_PROVIDER_REPOSITORY]
})
export class ProductProviderModule {}