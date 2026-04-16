import { DeepPartial } from "typeorm";
import { WarehouseDomain } from "../warehouse.domain";
export const WAREHOUSE_INTERFACE = Symbol('WAREHOUSE_INTERFACE');

export interface IWarehouse {
    createWarehouseEntry(entry: DeepPartial<WarehouseDomain>): Promise<void>;
    getWarehouseEntries(): Promise<WarehouseDomain[]>;
    getWarehouseEntryByName(name: string): Promise<WarehouseDomain | null>;
    updateWarehouse(entry: WarehouseDomain): Promise<WarehouseDomain | null>;
}