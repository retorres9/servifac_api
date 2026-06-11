import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { IProduct } from '@core/product/domain/repository/product.interface';
import { ProductDomain } from '@core/product/domain/product.domain';
import { BadRequestException, Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '@common/Redis/redis.provider';
import { Redis } from 'ioredis';

export class ProductRepository implements IProduct {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis
  ) {}
  getProductById(productId: number): Promise<ProductDomain | null> {
    const product = this.productRepository.findOne({ where: { prodId: productId } });
    return product.then(prod => prod ? this.mapToDomainEntity(prod) : null);
  }

  private mapToDomainEntity(productEntity: Product): ProductDomain {
    return (productEntity as unknown) as ProductDomain;
  }

  async createProduct(product: ProductDomain): Promise<void> {
    const productFound = await this.productRepository.findOne({ where: { prodBarcode: product.strProductCode } });
    if (productFound) {
      throw new BadRequestException('Product already exists');
    }
    const newProductEntity = this.productRepository.create({
      prodBarcode: product.strProductCode,
      prodCode: product.strProductCode,
      prodName: product.strProductName,
      prodFkTypeOfTax: { prmId: product.intTypeOfTax },
      category: { catId: product.intIdCategory }
    });
    await this.productRepository.save(newProductEntity);
    
  }
  getProducts(param: string): Promise<ProductDomain[]> {
    throw new Error('Method not implemented.');
  }
  async findByCode(strProductCode: string): Promise<ProductDomain | null> { 
    const redisKey = `product:findByCode:${strProductCode}`;
    try {
      const cachedProduct = await this.redisClient.get(redisKey);
      if (cachedProduct) {
        const parsedProduct = JSON.parse(cachedProduct);
        return parsedProduct;
      }
    } catch (error) {
      console.error('Error retrieving product from Redis:', error);
    }
    const productFound = await this.productRepository.findOne({ where: { prodBarcode: strProductCode } });
    if (!productFound) {
      return null;
    }
    const productDomain = this.mapToDomainEntity(productFound);
    try {
      await this.redisClient.set(redisKey, JSON.stringify(productDomain), 'EX', 60);
    } catch (error) {
      console.error('Error caching product in Redis:', error);
    }
    return productDomain;
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
