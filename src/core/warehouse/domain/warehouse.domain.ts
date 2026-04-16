export class WarehouseDomain {
    constructor(
        public intIdWarehouse: number,
        public strWarehouseName: string,
        public strWarehouseDescription: string,
        public intTypeOfWarehouse: number,
        public strWarehouseAddress: string
    ) {}
}