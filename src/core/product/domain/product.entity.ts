export class Product {
  constructor(
    public strProductCode: number,
    public strProductName: string,
    public dblPrice: number,
    public dblPvPrice: number,
    public dblRetailPrice: number,
    public intQuantityAvailable: number,
    public intMinQuantity: number,
    public intTypeOfTax: number,
    public intIdLocation: number,
    public intIdCategory: number
  ) {}
  getPrice(price: number, profit: number, tax: number): number {
    let calcPrice = 0;
    if (tax) {
      calcPrice =
        Number(price) + price * ((Number(profit) + Number(tax)) / 100);
    } else {
      calcPrice = Number(price) + price * (Number(profit) / 100);
    }
    return Number(this.roundPrice(calcPrice));
  }

  roundPrice(price: number) {
    const stringPrice =
      typeof price === 'string'
        ? String(price).split('.')
        : String(price.toFixed(2)).split('.');
    let decimal;
    if (stringPrice[1] === undefined) {
      return price;
    }
    if (Number(stringPrice[1]) >= 95) {
      return Math.round(price);
    }
    const intNumber =
      Number(stringPrice[1]) % 5 === 0
        ? (decimal = Number(stringPrice[1]))
        : (decimal = Number(Math.floor(Number(stringPrice[1]) / 5) * 5) + 5);
    return `${intNumber}.${decimal}`;
  }
}
