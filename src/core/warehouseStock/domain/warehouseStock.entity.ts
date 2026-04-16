export class WarehouseStockDomain {
    constructor(
        public strProductCode: string,
        public intWarehouseId: number,
        public intQuantity: number,
        public blReserved: boolean,
        public dcmLastCost: number,
        public dtmLastUpdate: Date,
        public intUpdatedBy: number,
    ) {}
}