import { Inject } from "@nestjs/common";
import { type IProductProvider, PRODUCT_PROVIDER_REPOSITORY } from "../../domain/interfaces/productProvider.interface";

export class UpdateProductProviderUseCase {
    constructor(
        @Inject(PRODUCT_PROVIDER_REPOSITORY)
        private readonly productProviderRepository: IProductProvider
    ) {}
    async execute(id: number, input: any): Promise<void> {
        await this.productProviderRepository.updateProductProvider(id, input);
    }
}