import { WarehouseStockDomain } from "../warehouseStock.entity";

export const WAREHOUSE_INTERFACE = Symbol('WAREHOUSE_INTERFACE');

export interface IWarehouseStock {
    getBillId(billId: string): Promise<string>;
    createWarehouseEntry(entry: WarehouseStockDomain): Promise<WarehouseStockDomain>;
    getWarehouseEntries(): Promise<WarehouseStockDomain[]>;
    findByProductCode(productCode: string): Promise<WarehouseStockDomain[]>;
    findByLocationId(locationId: number): Promise<WarehouseStockDomain[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<WarehouseStockDomain[]>;
}