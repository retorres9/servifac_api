export class SellStockLineInput {
    intIdProduct!: number;
    intIdWarehouse!: number;
    sllQuantity!: number;
    intUnitPrice!: number;
    intDiscount!: number;
    // intTotalPrice can be computed: (unitPrice * qty) - discount
}

export class SellStockInput {
    intCustomerId!: number;
    intIdStatus!: number;
    intUserId!: number;
    lines!: SellStockLineInput[];
    // dcmTotal and dcmTotalWithTax can be computed from lines
}