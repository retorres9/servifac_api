import { DeepPartial, Repository } from "typeorm";
import { IWarehouseRepository } from "../../domain/repository/warehouse.repository";
import { WarehouseEntity } from "../../domain/warehouse.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Warehouse } from "./warehouse.entity";
import { ParameterEntity } from "src/core/parameter/domain/parameter.entity";

export class WarehouseTypeormRepository implements IWarehouseRepository {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>
    ) {}
    async createWarehouseEntry(entry: DeepPartial<WarehouseEntity>): Promise<void> {

        const newWarehouse = this.warehouseRepository.create({
            wrhName: entry.strWarehouseName,
            wrhDescription: entry.strWarehouseDescription,
            wrhTypeOfWarehouse: entry.intTypeOfWarehouse! ? { prmId: (entry.intTypeOfWarehouse as any).prmId ?? (entry.intTypeOfWarehouse as any).intId }
      : undefined,
            wrhAddress: entry.strWarehouseAddress
        });
        await this.warehouseRepository.save(newWarehouse);
    }

    async getWarehouseEntries(): Promise<WarehouseEntity[]> {
        const warehouses = await this.warehouseRepository.find({ relations: { wrhTypeOfWarehouse: true } });
        return warehouses.map(warehouse => ({
            intIdWarehouse: warehouse.wrhId,
            strWarehouseName: warehouse.wrhName,
            strWarehouseDescription: warehouse.wrhDescription,
            intTypeOfWarehouse: warehouse.wrhTypeOfWarehouse as unknown as ParameterEntity,
            strWarehouseAddress: warehouse.wrhAddress
        }));
    }

    async getWarehouseEntryByName(name: string): Promise<WarehouseEntity | null> {
        const warehouse = await this.warehouseRepository.findOne({ where: { wrhName: name } });
        if (!warehouse) {
            return null;
        }
        return {
            intIdWarehouse: warehouse.wrhId,
            strWarehouseName: warehouse.wrhName,
            strWarehouseDescription: warehouse.wrhDescription,
            intTypeOfWarehouse: warehouse.wrhTypeOfWarehouse as unknown as ParameterEntity,
            strWarehouseAddress: warehouse.wrhAddress
        };
    }

    async updateWarehouse(entry: WarehouseEntity): Promise<WarehouseEntity | null> {
        const warehouse = await this.warehouseRepository.findOne({ where: { wrhId: entry.intIdWarehouse }, relations: { wrhTypeOfWarehouse: true } });
        if (!warehouse) {
            return null;
        }
        warehouse.wrhName = entry.strWarehouseName;
        warehouse.wrhDescription = entry.strWarehouseDescription;
        warehouse.wrhTypeOfWarehouse = entry.intTypeOfWarehouse! ? { prmId: (entry.intTypeOfWarehouse as any).prmId ?? (entry.intTypeOfWarehouse as any).intId } : undefined as any;
        warehouse.wrhAddress = entry.strWarehouseAddress;
        const updatedWarehouse = await this.warehouseRepository.save(warehouse);
        return {
            intIdWarehouse: updatedWarehouse.wrhId,
            strWarehouseName: updatedWarehouse.wrhName,
            strWarehouseDescription: updatedWarehouse.wrhDescription,
            intTypeOfWarehouse: updatedWarehouse.wrhTypeOfWarehouse as unknown as ParameterEntity,
            strWarehouseAddress: updatedWarehouse.wrhAddress
        };
    }
}