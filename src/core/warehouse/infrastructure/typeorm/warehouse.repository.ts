import { DeepPartial, Repository } from "typeorm";
import { IWarehouse } from "../../domain/repository/warehouse.interface";
import { WarehouseDomain } from "../../domain/warehouse.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Warehouse } from "./warehouse.entity";
import { ParameterDomain } from "@core/parameter/domain/parameter.domain";

export class WarehouseTypeormRepository implements IWarehouse {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>
    ) {}
    async createWarehouseEntry(entry: DeepPartial<WarehouseDomain>): Promise<void> {
        const fk = (() => {
            if (!entry.intTypeOfWarehouse) return undefined;
            const v = entry.intTypeOfWarehouse as any;
            if (typeof v === 'number') return { prmId: v };
            return { prmId: v.prmId ?? v.intId ?? v };
        })();
        const newWarehouse = this.warehouseRepository.create({
            wrhName: entry.strWarehouseName,
            wrhDescription: entry.strWarehouseDescription,
            wrhFkTypeOfWarehouse: fk as any,
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
            intTypeOfWarehouse: warehouse.wrhFkTypeOfWarehouse.prmId,
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
            intTypeOfWarehouse: warehouse.wrhFkTypeOfWarehouse.prmId,
            strWarehouseAddress: warehouse.wrhAddress
        };
    }

    async updateWarehouse(entry: WarehouseDomain): Promise<WarehouseDomain | null> {
        const existing = await this.warehouseRepository.findOne({ where: { wrhId: entry.intIdWarehouse } });
        if (!existing) return null;
        const fk = (() => {
            if (!entry.intTypeOfWarehouse) return undefined;
            const v = entry.intTypeOfWarehouse as any;
            if (typeof v === 'number') return { prmId: v };
            return { prmId: v.prmId ?? v.intId ?? v };
        })();
        await this.warehouseRepository.update(entry.intIdWarehouse as any, {
            wrhName: entry.strWarehouseName,
            wrhDescription: entry.strWarehouseDescription,
            wrhFkTypeOfWarehouse: fk as any,
            wrhAddress: entry.strWarehouseAddress
        } as any);
        const updatedWarehouse = await this.warehouseRepository.findOne({ where: { wrhId: entry.intIdWarehouse }, relations: { wrhFkTypeOfWarehouse: true } });
        if (!updatedWarehouse) return null;
        return {
            intIdWarehouse: updatedWarehouse.wrhId,
            strWarehouseName: updatedWarehouse.wrhName,
            strWarehouseDescription: updatedWarehouse.wrhDescription,
            intTypeOfWarehouse: updatedWarehouse.wrhFkTypeOfWarehouse.prmId,
            strWarehouseAddress: updatedWarehouse.wrhAddress
        };
    }
}