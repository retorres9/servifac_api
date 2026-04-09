export class Product {
  constructor(
    public strProductCode: string,
    public strProductName: string,
    public intMinQuantity: number,
    public intTypeOfTax: number,
    public intIdLocation: number,
    public intIdCategory: number
  ) {}
}
