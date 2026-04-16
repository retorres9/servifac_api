import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { IProduct } from 'src/core/product/domain/repository/product.interface';
import { Product } from 'src/core/product/domain/product.entity';
import { BadRequestException } from '@nestjs/common';

export class ProductTypeormRespository implements IProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  private mapToDomainEntity(productEntity: ProductEntity): Product {
    return (productEntity as unknown) as Product;
  }

  async createProduct(product: Product): Promise<Product> {
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
  getProducts(param: string): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  async findByCode(strProductCode: string): Promise<Product | null> {
    const productFound = await this.productRepository.findOne({ where: { prodBarcode: strProductCode } });
    if (!productFound) {
      return null;
    }
    return this.mapToDomainEntity(productFound);
  }
  getProductsInventory(criteria: string, tax: number): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  getProductWarnings(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getProductMinimumStock(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  updateProductStock(strProductCode: number, intQuantityAvailable: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
