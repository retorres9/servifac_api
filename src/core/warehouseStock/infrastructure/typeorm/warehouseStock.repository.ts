import { Repository } from "typeorm";
import { WarehouseStock } from "./warehouseStock.entity";
import { IWarehouseStock } from "../../domain/repository/warehouseStock.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";

export class WareHouseStockRepository implements IWarehouseStock {
    constructor(
        @InjectRepository(WarehouseStock)
        private readonly warehouseStockRepository: Repository<WarehouseStock>
    ) {}

    async addStock(entry: WarehouseStockDomain): Promise<WarehouseStockDomain> {
        const newStockEntity = this.warehouseStockRepository.create({
            wrsFkProductCode: { prodId: entry.intProductCode },
            wrsFkWarehouseId: { wrhId: entry.intWarehouseId },
            wrsQuantity: entry.intQuantity,
            wrsReservedQuantity: entry.intReserved,
            wrsUnityOfMeasure: entry.intUnityOfMeasure ?? null,
            wrsFkLocationId: { locId: entry.intLocationId },
            wrsSalePrice: entry.dcmPrice,
            wrsDiscountPrice: entry.dcmDiscount || null,
            wrsMinQuantity: entry.intMinimumStock || null,
            wrsMaxQuantity: entry.intMaximumStock || null,
        } as WarehouseStock);
        const savedStock = await this.warehouseStockRepository.save(newStockEntity);
        return  new WarehouseStockDomain(
            savedStock.wrsId,
            savedStock.wrsFkProductCode.prodId, 
            savedStock.wrsFkWarehouseId.wrhId,
            savedStock.wrsQuantity,
            savedStock.wrsReservedQuantity,
            savedStock.wrsSalePrice,
            savedStock.wrsUnityOfMeasure,
            savedStock.wrsFkLocationId ? savedStock.wrsFkLocationId.locId : undefined,
            savedStock.wrsDiscountPrice || undefined,
            savedStock.wrsMinQuantity || undefined,
            savedStock.wrsMaxQuantity || undefined
        );
    }
    getStockByProduct(productId: number): Promise<WarehouseStockDomain[]> {
        throw new Error("Method not implemented.");
    }
    getStockByWarehouse(warehouseId: number): Promise<WarehouseStockDomain[]> {
        throw new Error("Method not implemented.");
    }
    getStockByProductAndWarehouse(productId: number, warehouseId: number): Promise<WarehouseStockDomain[]> {
        throw new Error("Method not implemented.");
    }
    updStock(productId: number, warehouseId: number, newQty: number): Promise<WarehouseStockDomain> {
        throw new Error("Method not implemented.");
    }
    updStockPrices(productId: number, warehouseId: number, newPrice: number): Promise<WarehouseStockDomain> {
        throw new Error("Method not implemented.");
    }
    
}