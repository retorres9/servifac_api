import { Inject } from "@nestjs/common";
import { type IWarehouseStock, WAREHOUSESTOCK_INTERFACE } from "../../domain/repository/warehouseStock.interface";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";

export class GetStockByProductUseCase {
    constructor(
        @Inject(WAREHOUSESTOCK_INTERFACE)
        private readonly warehouseStock: IWarehouseStock
    ){}

    async execute(productId: number): Promise<WarehouseStockDomain[]> {
        const stockEntries = await this.warehouseStock.getStockByProduct(productId);
        return stockEntries;
    }
}