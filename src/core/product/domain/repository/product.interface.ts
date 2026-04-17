import { ProductDomain } from '../product.domain';
export const PRODUCT_INTERFACE = Symbol('PRODUCT_INTERFACE');
export interface IProduct {
  createProduct(product: ProductDomain): Promise<ProductDomain>;
  getProducts(param: string): Promise<ProductDomain[]>;
  getProductById(productId: number): Promise<ProductDomain | null>;
  findByCode(strProductCode: string): Promise<ProductDomain | null>;
  getProductsInventory(criteria: string, tax: number): Promise<ProductDomain[]>;
  getProductWarnings(): Promise<boolean>;
  getProductMinimumStock(): Promise<ProductDomain[]>;
  updateProductStock(
    strProductCode: number,
    intQuantityAvailable: number
  ): Promise<void>;
}
