import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/core/product/domain/repository/product.repository';
import { Product } from 'src/core/product/domain/product.entity';

export class ProductTypeormRespository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}
  createProduct(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  getProducts(param: string): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  findByCode(strProductCode: number): Promise<Product | null> {
    throw new Error('Method not implemented.');
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
