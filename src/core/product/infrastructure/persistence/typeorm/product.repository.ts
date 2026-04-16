import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { IProduct } from 'src/core/product/domain/repository/product.interface';
import { ProductDomain } from 'src/core/product/domain/product.domain';
import { BadRequestException } from '@nestjs/common';

export class ProductTypeormRespository implements IProduct {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  private mapToDomainEntity(productEntity: Product): ProductDomain {
    return (productEntity as unknown) as ProductDomain;
  }

  async createProduct(product: ProductDomain): Promise<ProductDomain> {
    const productFound = await this.productRepository.findOne({ where: { prodBarcode: product.strProductCode } });
    if (productFound) {
      throw new BadRequestException('Product already exists');
    }
    const newProductEntity = this.productRepository.create({
      prodBarcode: product.strProductCode,
      prod_name: product.strProductName,
      prod_typeOfTax: product.intTypeOfTax,
      location: { locId: product.intIdLocation },
      category: { cat_id: product.intIdCategory }
    });
    const savedProduct = await this.productRepository.save(newProductEntity);
    return this.mapToDomainEntity(savedProduct);
  }
  getProducts(param: string): Promise<ProductDomain[]> {
    throw new Error('Method not implemented.');
  }
  async findByCode(strProductCode: string): Promise<ProductDomain | null> {
    const productFound = await this.productRepository.findOne({ where: { prodBarcode: strProductCode } });
    if (!productFound) {
      return null;
    }
    return this.mapToDomainEntity(productFound);
  }
  getProductsInventory(criteria: string, tax: number): Promise<ProductDomain[]> {
    throw new Error('Method not implemented.');
  }
  getProductWarnings(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getProductMinimumStock(): Promise<ProductDomain[]> {
    throw new Error('Method not implemented.');
  }
  updateProductStock(strProductCode: number, intQuantityAvailable: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
