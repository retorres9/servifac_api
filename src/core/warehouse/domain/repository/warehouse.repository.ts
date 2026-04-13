import { DeepPartial } from "typeorm";
import { WarehouseEntity } from "../warehouse.entity";
export const WAREHOUSE_REPOSITORY = Symbol('WAREHOUSE_REPOSITORY');

export interface IWarehouseRepository {
    createWarehouseEntry(entry: DeepPartial<WarehouseEntity>): Promise<void>;
    getWarehouseEntries(): Promise<WarehouseEntity[]>;
    getWarehouseEntryByName(name: string): Promise<WarehouseEntity | null>;
    updateWarehouse(entry: WarehouseEntity): Promise<WarehouseEntity | null>;
}