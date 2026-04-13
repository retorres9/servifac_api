import { WarehouseEntity } from "../warehouse.entity";

export const WAREHOUSE_REPOSITORY = 'WAREHOUSE_REPOSITORY';

export interface WarehouseRepository {
    getBillId(billId: string): Promise<string>;
    createWarehouseEntry(entry: WarehouseEntity): Promise<WarehouseEntity>;
    getWarehouseEntries(): Promise<WarehouseEntity[]>;
    findByProductCode(productCode: string): Promise<WarehouseEntity[]>;
    findByLocationId(locationId: number): Promise<WarehouseEntity[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<WarehouseEntity[]>;
}