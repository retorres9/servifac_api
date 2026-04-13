export class WarehouseEntity {
    constructor(
        public strProductCode: string,
        public intLocationId: number,
        public dtOccurredAt: Date,
        public intQuantity: number,
        public strReference: string,
        public dcmUnitCost: number,
        public dcmBalanceAfter: number,
        public strNotes: string,
        public strMovementType: string,
        public strBillId: string
    ) {}
}