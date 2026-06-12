import { ProductDomain } from "@core/product/domain/product.domain";
import { ProductRepository } from "@core/product/infrastructure/persistence/typeorm/product.repository";

export class GetProductByIdUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}
  
  async execute(productId: number): Promise<ProductDomain | null> {
    return await this.productRepository.getProductById(productId);
  }
}