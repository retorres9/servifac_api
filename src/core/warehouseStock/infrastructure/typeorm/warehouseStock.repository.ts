import { Repository } from "typeorm";
import { WarehouseStock } from "./warehouseStock.entity";
import { IWarehouseStock } from "../../domain/repository/warehouseStock.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";
import { GetStockByWarehouseOutput } from "../../application/model/getStockByWarehouse.output";

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
            wrsUnityOfMeasure: entry.strUnityOfMeasure ?? null,
            wrsFkLocationId: { locId: entry.intLocationId },
            wrsSalePrice: entry.dcmPrice,
            wrsDiscountPrice: entry.dcmDiscount || null,
            wrsMinQuantity: entry.intMinimumStock || null,
            wrsMaxQuantity: entry.intMaximumStock || null,
        } as WarehouseStock);
        const savedStock = await this.warehouseStockRepository.save(newStockEntity);
        return  new WarehouseStockDomain(
            savedStock.wrsFkProductCode.prodId, 
            savedStock.wrsFkWarehouseId.wrhId,
            savedStock.wrsFkLocationId.locId,
            savedStock.wrsQuantity,
            savedStock.wrsSalePrice,
            savedStock.wrsReservedQuantity,
            null,
            savedStock.wrsUnityOfMeasure,
            savedStock.wrsDiscountPrice || undefined,
            savedStock.wrsFkLocationId ? savedStock.wrsFkLocationId.locId : undefined,
            savedStock.wrsMinQuantity || undefined,
            savedStock.wrsMaxQuantity || undefined
        );
    }
    getStockByProduct(productId: number): Promise<WarehouseStockDomain[]> {
        const stockEntries = this.warehouseStockRepository.find({
            where: { wrsFkProductCode: { prodId: productId } },
            relations: ['wrsFkWarehouseId', 'wrsFkLocationId', 'wrsFkProductCode']
        });
        return stockEntries.then(entries => entries.map(entry => new WarehouseStockDomain(
            entry.wrsFkProductCode.prodId, 
            entry.wrsFkWarehouseId.wrhId,
            entry.wrsFkLocationId.locId,
            entry.wrsQuantity,
            entry.wrsSalePrice,
            entry.wrsReservedQuantity,
            null,
            entry.wrsUnityOfMeasure,
            entry.wrsDiscountPrice || undefined,
            entry.wrsMinQuantity || undefined,
            entry.wrsMaxQuantity || undefined
        )));
    }
    getStockByWarehouse(warehouseId: number): Promise<WarehouseStockDomain[]> {
        const stockEntries = this.warehouseStockRepository.find({
            where: { wrsFkWarehouseId: { wrhId: warehouseId } },
            relations: ['wrsFkProductCode', 'wrsFkWarehouseId', 'wrsFkLocationId']
        });
        return stockEntries.then(entries => entries.map(entry => new WarehouseStockDomain(
            entry.wrsFkProductCode.prodId, 
            entry.wrsFkWarehouseId.wrhId,
            entry.wrsFkLocationId.locId,
            entry.wrsQuantity,
            entry.wrsSalePrice,
            entry.wrsReservedQuantity,
            null,
            entry.wrsUnityOfMeasure,
            entry.wrsDiscountPrice || undefined,
            entry.wrsMinQuantity || undefined,
            entry.wrsMaxQuantity || undefined
        )));
    }
    getStockByProductAndWarehouse(productId: number, warehouseId: number): Promise<WarehouseStockDomain[]> {
        const stockEntries = this.warehouseStockRepository.find({
            where: { 
                wrsFkProductCode: { prodId: productId },
                wrsFkWarehouseId: { wrhId: warehouseId }
            },
            relations: ['wrsFkProductCode', 'wrsFkWarehouseId', 'wrsFkLocationId']
        });
        return stockEntries.then(entries => entries.map(entry => new WarehouseStockDomain(
            entry.wrsFkProductCode.prodId, 
            entry.wrsFkWarehouseId.wrhId,
            entry.wrsFkLocationId.locId,
            entry.wrsQuantity,
            entry.wrsSalePrice,
            entry.wrsReservedQuantity,
            null,
            entry.wrsUnityOfMeasure,
            entry.wrsDiscountPrice || undefined,
            entry.wrsMinQuantity || undefined,
            entry.wrsMaxQuantity || undefined
        )));

    }

    updStock(productId: number, warehouseId: number, newQty: number): Promise<WarehouseStockDomain> {
        const stockEntry = this.warehouseStockRepository.findOne({
            where: { 
                wrsFkProductCode: { prodId: productId },
                wrsFkWarehouseId: { wrhId: warehouseId }
            },
            relations: ['wrsFkProductCode', 'wrsFkWarehouseId', 'wrsFkLocationId']
        });

        const updatedStock = stockEntry.then(entry => {
            if (!entry) {
                throw new Error('Stock entry not found for the given product and warehouse');
            }
            entry.wrsQuantity = newQty;
            return this.warehouseStockRepository.save(entry).then(savedEntry => new WarehouseStockDomain(
                savedEntry.wrsFkProductCode.prodId, 
                savedEntry.wrsFkWarehouseId.wrhId,
                savedEntry.wrsFkLocationId.locId,
                savedEntry.wrsQuantity,
                savedEntry.wrsSalePrice,
                savedEntry.wrsReservedQuantity,
                null,
                savedEntry.wrsUnityOfMeasure,
                savedEntry.wrsDiscountPrice || undefined,
                savedEntry.wrsMinQuantity || undefined,
                savedEntry.wrsMaxQuantity || undefined
            ));
        });
        return updatedStock;

    }
    updStockPrices(productId: number, warehouseId: number, newPrice: number): Promise<WarehouseStockDomain> {
        const stockEntry = this.warehouseStockRepository.findOne({
            where: { 
                wrsFkProductCode: { prodId: productId },
                wrsFkWarehouseId: { wrhId: warehouseId }
            },
            relations: ['wrsFkProductCode', 'wrsFkWarehouseId', 'wrsFkLocationId']
        });
        const updatedStock = stockEntry.then(entry => {
            if (!entry) {
                throw new Error('Stock entry not found for the given product and warehouse');
            }
            entry.wrsSalePrice = newPrice;
            return this.warehouseStockRepository.save(entry).then(savedEntry => new WarehouseStockDomain(
                savedEntry.wrsFkProductCode.prodId, 
                savedEntry.wrsFkWarehouseId.wrhId,
                savedEntry.wrsFkLocationId.locId,
                savedEntry.wrsQuantity,
                savedEntry.wrsSalePrice,
                savedEntry.wrsReservedQuantity,
                null,
                savedEntry.wrsUnityOfMeasure,
                savedEntry.wrsDiscountPrice || undefined,
                savedEntry.wrsMinQuantity || undefined,
                savedEntry.wrsMaxQuantity || undefined
            ));
        });
        return updatedStock;

    }
    
}