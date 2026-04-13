import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/core/product/domain/repository/product.repository';
import { Product } from 'src/core/product/domain/product.entity';
import { BadRequestException } from '@nestjs/common';

export class ProductTypeormRespository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  private mapToDomainEntity(productEntity: ProductEntity): Product {
    return (productEntity as unknown) as Product;
  }

  async createProduct(product: Product): Promise<Product> {
    const productFound = await this.productRepository.findOne({ where: { prod_code: product.strProductCode } });
    if (productFound) {
      throw new BadRequestException('Product already exists');
    }
    const newProductEntity = this.productRepository.create({
      prod_code: product.strProductCode,
      prod_name: product.strProductName,
      prod_typeOfTax: product.intTypeOfTax,
      location: { loc_id: product.intIdLocation },
      category: { cat_id: product.intIdCategory }
    });
    const savedProduct = await this.productRepository.save(newProductEntity);
    return this.mapToDomainEntity(savedProduct);
  }
  getProducts(param: string): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  async findByCode(strProductCode: string): Promise<Product | null> {
    const productFound = await this.productRepository.findOne({ where: { prod_code: strProductCode } });
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
