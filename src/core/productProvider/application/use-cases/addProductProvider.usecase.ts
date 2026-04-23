import { Inject } from "@nestjs/common";
import { type IProductProvider, PRODUCT_PROVIDER_REPOSITORY } from "../../domain/interfaces/productProvider.interface";
import { ProductProviderDomain } from "../../domain/productProvider.domain";

export class CreateProcuctProviderUseCase {
    constructor(
        @Inject(PRODUCT_PROVIDER_REPOSITORY)
        private readonly productProviderRepository: IProductProvider
    ) {}

    async execute(input: ProductProviderDomain): Promise<void> {
        await this.productProviderRepository.createProductProvider({
            intIdProduct: input.intIdProduct,
            intIdProvider: input.intIdProvider,
            strSupplierSku: input.strSupplierSku,
            intUnitPrice: input.intUnitPrice,
            intLeadDays: input.intLeadDays,
            isActive: input.isActive,
            intId: 0
        });
    }
}