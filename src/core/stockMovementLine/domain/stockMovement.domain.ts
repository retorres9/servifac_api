export class StockMovementLineDomain {
    constructor(
        public intIdStockMovement: number,
        public intIdProduct: number,
        public intIdWarehouse: number,
        public intChange: number,
        public intNewQuantity: number,
        public intPreviousQuantity: number
    ) {}
}