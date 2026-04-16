import { DeepPartial, Repository } from "typeorm";
import { IWarehouse } from "../../domain/repository/warehouse.interface";
import { WarehouseDomain } from "../../domain/warehouse.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Warehouse } from "./warehouse.entity";
import { ParameterEntity } from "src/core/parameter/domain/parameter.entity";

export class WarehouseTypeormRepository implements IWarehouse {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>
    ) {}
    async createWarehouseEntry(entry: DeepPartial<WarehouseDomain>): Promise<void> {

        const newWarehouse = this.warehouseRepository.create({
            wrhName: entry.strWarehouseName,
            wrhDescription: entry.strWarehouseDescription,
            wrhFkTypeOfWarehouse: entry.intTypeOfWarehouse! ? { prmId: (entry.intTypeOfWarehouse as any).prmId ?? (entry.intTypeOfWarehouse as any).intId }
      : undefined,
            wrhAddress: entry.strWarehouseAddress
        });
        await this.warehouseRepository.save(newWarehouse);
    }

    async getWarehouseEntries(): Promise<WarehouseDomain[]> {
        const warehouses = await this.warehouseRepository.find({ relations: { wrhFkTypeOfWarehouse: true } });
        return warehouses.map(warehouse => ({
            intIdWarehouse: warehouse.wrhId,
            strWarehouseName: warehouse.wrhName,
            strWarehouseDescription: warehouse.wrhDescription,
            intTypeOfWarehouse: warehouse.wrhFkTypeOfWarehouse as unknown as ParameterEntity,
            strWarehouseAddress: warehouse.wrhAddress
        }));
    }

    async getWarehouseEntryByName(name: string): Promise<WarehouseDomain | null> {
        const warehouse = await this.warehouseRepository.findOne({ where: { wrhName: name } });
        if (!warehouse) {
            return null;
        }
        return {
            intIdWarehouse: warehouse.wrhId,
            strWarehouseName: warehouse.wrhName,
            strWarehouseDescription: warehouse.wrhDescription,
            intTypeOfWarehouse: warehouse.wrhFkTypeOfWarehouse as unknown as ParameterEntity,
            strWarehouseAddress: warehouse.wrhAddress
        };
    }

    async updateWarehouse(entry: WarehouseDomain): Promise<WarehouseDomain | null> {
        const warehouse = await this.warehouseRepository.findOne({ where: { wrhId: entry.intIdWarehouse }, relations: { wrhFkTypeOfWarehouse: true } });
        if (!warehouse) {
            return null;
        }
        warehouse.wrhName = entry.strWarehouseName;
        warehouse.wrhDescription = entry.strWarehouseDescription;
        warehouse.wrhFkTypeOfWarehouse = entry.intTypeOfWarehouse! ? { prmId: (entry.intTypeOfWarehouse as any).prmId ?? (entry.intTypeOfWarehouse as any).intId } : undefined as any;
        warehouse.wrhAddress = entry.strWarehouseAddress;
        const updatedWarehouse = await this.warehouseRepository.save(warehouse);
        return {
            intIdWarehouse: updatedWarehouse.wrhId,
            strWarehouseName: updatedWarehouse.wrhName,
            strWarehouseDescription: updatedWarehouse.wrhDescription,
            intTypeOfWarehouse: updatedWarehouse.wrhFkTypeOfWarehouse as unknown as ParameterEntity,
            strWarehouseAddress: updatedWarehouse.wrhAddress
        };
    }
}