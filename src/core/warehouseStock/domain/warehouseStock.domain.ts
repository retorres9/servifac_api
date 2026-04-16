export class WarehouseStockDomain {
    constructor(
        public intIdWarehouseStock: number,
        public intProductCode: number,
        public intWarehouseId: number,
        public intQuantity: number,
        public intReserved: number,
        public dcmPrice: number,
        public intUnityOfMeasure?: string,
        public intLocationId?: number,
        public dcmDiscount?: number,
        public intMinimumStock?: number,
        public intMaximumStock?: number,
        public intUpdatedBy?: number,
    ) {}
}