export class ProductDomain {
  constructor(
    public strProductCode: string,
    public strCode: string,
    public strProductName: string,
    public intTypeOfTax: number,
    public intIdLocation: number,
    public intIdCategory: number
  ) {}
}
