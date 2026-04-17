export class WarehouseStockDomain {
    constructor(
        public intProductCode: number,
        public intWarehouseId: number,
        public intLocationId: number,
        public intQuantity: number,
        public dcmPrice: number,
        public intReserved?: number | null,
        public intIdWarehouseStock?: number | null,
        public strUnityOfMeasure?: string | null,
        public dcmDiscount?: number | null,
        public intMinimumStock?: number | null,
        public intMaximumStock?: number | null,
        public intUpdatedBy?: number | null
    ) {}
}