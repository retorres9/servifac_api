import { type IProduct, PRODUCT_INTERFACE } from "@core/product/domain/repository/product.interface";
import { Inject } from "@nestjs/common";
import { SearchProductInput } from "../model/search-prpduct.input";

export class SearchProductUseCase {
  constructor(
    @Inject(PRODUCT_INTERFACE)
    private readonly productRepository: IProduct
  ) {}

  async execute(criteria: SearchProductInput): Promise<any> {
    return await this.productRepository.searchProducts(criteria);
  }
}