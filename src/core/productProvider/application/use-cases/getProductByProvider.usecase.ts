import { Inject } from "@nestjs/common";
import { type IProductProvider, PRODUCT_PROVIDER_REPOSITORY } from "../../domain/interfaces/productProvider.interface";

export class GetProductByProviderUseCase {
    constructor(
        @Inject(PRODUCT_PROVIDER_REPOSITORY)
        private readonly productProviderRepository: IProductProvider
    ) {}
    async execute(id: number): Promise<any> {
        return await this.productProviderRepository.getProductProviderById(id);
    }
}