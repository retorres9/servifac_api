export type CreateProductInput = {
  strProductCode: number;
  strProductName: string;
  dblPrice: number;
  dblPvPrice: number;
  dblRetailPrice: number;
  intQuantityAvailable: number;
  intMinQuantity: number;
  intTypeOfTax: number;
  mnyProfitMargin: number;
  intIdLocation: number;
  intIdCategory: number;
};
