import { ProductDomain } from "@core/product/domain/product.domain";
import { type IProduct, PRODUCT_INTERFACE } from "@core/product/domain/repository/product.interface";
    import { Inject } from "@nestjs/common";

export class GetProductCodeUseCase {
  constructor(
    @Inject(PRODUCT_INTERFACE)
    private readonly productInterface: IProduct
  ) {}

  async execute(strCode: string): Promise<ProductDomain | null> {
    return await this.productInterface.findByCode(strCode);
  }
}