import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IProductProvider } from "../../domain/interfaces/productProvider.interface";
import { ProductProvider } from "./product-provider.entity";
import { ProductProviderDomain } from "../../domain/productProvider.domain";

export class ProductProviderRepository implements IProductProvider {
    constructor(
        @InjectRepository(ProductProvider)
        private readonly productProviderRepository: Repository<ProductProvider>
    ) {}
    async createProductProvider(productProvider: ProductProviderDomain): Promise<void> {
        const newProductProviderEntity = this.productProviderRepository.create({
            pprFkProductId: { prodId: productProvider.intIdProduct },
            pprFkProviderId: { prvId: productProvider.intIdProvider },
            pprSupplierSku: productProvider.strSupplierSku,
            pprCostPrice: productProvider.intUnitPrice,
            pprLeadDays: productProvider.intLeadDays,
            pprIsActive: productProvider.isActive
        });
        await this.productProviderRepository.save(newProductProviderEntity);
    }
    async getProductProviderById(id: number): Promise<ProductProviderDomain[] | null> {
        const productProviders = await this.productProviderRepository.find({
            where: { prpId: id },
            relations: ['pprFkProductId', 'pprFkProviderId']
        });
        if (!productProviders || productProviders.length === 0) {
            return null;
        }
        return productProviders.map(productProvider => new ProductProviderDomain(
            productProvider.pprFkProductId.prodId,
            productProvider.pprFkProviderId.prvId,
            productProvider.pprSupplierSku,
            productProvider.pprCostPrice,
            productProvider.pprLeadDays,
            productProvider.pprIsActive
        ));
    }
    async getAllProductProviders(): Promise<ProductProviderDomain[]> {
        const productProviders = await this.productProviderRepository.find({ relations: ['pprFkProductId', 'pprFkProviderId'] });
        return productProviders.map(productProvider => new ProductProviderDomain(
            productProvider.pprFkProductId.prodId,
            productProvider.pprFkProviderId.prvId,
            productProvider.pprSupplierSku,
            productProvider.pprCostPrice,
            productProvider.pprLeadDays,
            productProvider.pprIsActive
        ));
    }
    async updateProductProvider(id: number, productProvider: ProductProviderDomain): Promise<void> {
        const productProviderFound = await this.productProviderRepository.findOne({ where: { prpId: id } });
        if (!productProviderFound) {
            throw new Error('ProductProvider not found');
        }
        productProviderFound.pprFkProductId = { prodId: productProvider.intIdProduct } as any;
        productProviderFound.pprFkProviderId = { prvId: productProvider.intIdProvider } as any;
        productProviderFound.pprSupplierSku = productProvider.strSupplierSku;
        productProviderFound.pprCostPrice = productProvider.intUnitPrice;
        productProviderFound.pprLeadDays = productProvider.intLeadDays;
        productProviderFound.pprIsActive = productProvider.isActive;
        await this.productProviderRepository.save(productProviderFound);
    }
}