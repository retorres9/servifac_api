import { BadRequestException, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../../domain/repository/product.repository';
import type { ProductRepository } from '../../domain/repository/product.repository';
import { CreateProductOutput } from '../model/create-product.output';
import { CreateProductInput } from '../model/create-product.input';
import { Product } from '../../domain/product.entity';

export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(
    productInput: CreateProductInput
  ): Promise<CreateProductOutput> {
    const existingProduct = await this.productRepository.findByCode(
      productInput.strProductCode
    );
    if (existingProduct) {
      throw new BadRequestException('Product already exists');
    }

    const product = new Product(
      productInput.strProductCode,
      productInput.strProductName,
      productInput.intTypeOfTax,
      productInput.intIdLocation,
      productInput.intIdCategory
    );

    const productOutput = await this.productRepository.createProduct(product);
    return {
      strProductId: productOutput.strProductCode,
      strProductName: productOutput.strProductName
    };
  }
}
