import { ProductProviderDomain } from "../productProvider.domain";

export const PRODUCT_PROVIDER_REPOSITORY = Symbol('PRODUCT_PROVIDER_REPOSITORY');
export interface IProductProvider {
    createProductProvider(productProvider: ProductProviderDomain): Promise<void>;
    getProductProviderById(id: number): Promise<ProductProviderDomain[] | null>;
    getAllProductProviders(): Promise<ProductProviderDomain[]>;
    updateProductProvider(id: number, productProvider: ProductProviderDomain): Promise<void>;
}