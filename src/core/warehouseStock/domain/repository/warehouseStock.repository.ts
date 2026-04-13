import { WarehouseStockEntity } from "../warehouseStock.entity";

export const WAREHOUSE_REPOSITORY = Symbol('WAREHOUSE_REPOSITORY');

export interface WarehouseRepository {
    getBillId(billId: string): Promise<string>;
    createWarehouseEntry(entry: WarehouseStockEntity): Promise<WarehouseStockEntity>;
    getWarehouseEntries(): Promise<WarehouseStockEntity[]>;
    findByProductCode(productCode: string): Promise<WarehouseStockEntity[]>;
    findByLocationId(locationId: number): Promise<WarehouseStockEntity[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<WarehouseStockEntity[]>;
}