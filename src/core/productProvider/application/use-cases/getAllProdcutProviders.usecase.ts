import { Inject } from "@nestjs/common";
import { type IProductProvider, PRODUCT_PROVIDER_REPOSITORY } from "../../domain/interfaces/productProvider.interface";

export class GetAllProductProvidersUseCase {
    constructor(
        @Inject(PRODUCT_PROVIDER_REPOSITORY)
        private readonly productProviderRepository: IProductProvider
    ) {}
    async execute(): Promise<any> {
        return await this.productProviderRepository.getAllProductProviders();
    }
}