export class SalesDomain {
    constructor(
        public intSaleId: number,
        public intIdProduct: number,
        public intIdWarehouse: number,
        public sllQuantity: number,
        public intUnitPrice: number,
        public intTotalPrice: number,
        public intDiscount: number
    ) {}
}