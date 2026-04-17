import { Inject } from "@nestjs/common";
import { type IWarehouseStock, WAREHOUSESTOCK_INTERFACE } from "../../domain/repository/warehouseStock.interface";
import { GetStockByWarehouseOutput } from "../model/getStockByWarehouse.output";

export class GetStockByWarehouseUseCase {
    constructor(
        @Inject(WAREHOUSESTOCK_INTERFACE)
        private readonly warehouseStock: IWarehouseStock
    ){}

    async execute(warehouseId: number): Promise<GetStockByWarehouseOutput[]> {
        const stockEntries = await this.warehouseStock.getStockByWarehouse(warehouseId);
        return stockEntries.map(entry => ({
            strProductName: entry.strProductName, // Assuming you want to return the product name.
            intQuantity: entry.intQuantity,
            dcmPrice: entry.dcmPrice,
            strUnityOfMeasure: entry.strUnityOfMeasure
        }));
    }
}