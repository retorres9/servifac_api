import { BadRequestException, Inject } from '@nestjs/common';
import { PRODUCT_INTERFACE } from '../../domain/repository/product.interface';
import type { IProduct } from '../../domain/repository/product.interface';
import { CreateProductOutput } from '../model/create-product.output';
import { CreateProductInput } from '../model/create-product.input';
import { ProductDomain } from '../../domain/product.domain';

export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_INTERFACE)
    private readonly productRepository: IProduct
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

    const product = new ProductDomain(
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
