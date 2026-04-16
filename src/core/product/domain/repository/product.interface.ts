import { Product } from '../product.entity';
export const PRODUCT_INTERFACE = Symbol('PRODUCT_INTERFACE');
export interface IProduct {
  createProduct(product: Product): Promise<Product>;
  getProducts(param: string): Promise<Product[]>;
  findByCode(strProductCode: string): Promise<Product | null>;
  getProductsInventory(criteria: string, tax: number): Promise<Product[]>;
  getProductWarnings(): Promise<boolean>;
  getProductMinimumStock(): Promise<Product[]>;
  updateProductStock(
    strProductCode: number,
    intQuantityAvailable: number
  ): Promise<void>;
}
