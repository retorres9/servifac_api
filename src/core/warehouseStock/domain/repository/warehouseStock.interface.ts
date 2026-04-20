import { GetStockByWarehouseOutput } from "../../application/model/getStockByWarehouse.output";
import { WarehouseStockDomain } from "../warehouseStock.domain";

export const WAREHOUSESTOCK_INTERFACE = Symbol('WAREHOUSESTOCK_INTERFACE');

export interface IWarehouseStock {
    addStock(entry: WarehouseStockDomain): Promise<WarehouseStockDomain>;
    getStockByProduct(productId: number): Promise<WarehouseStockDomain[]>;
    getStockByWarehouse(warehouseId: number): Promise<WarehouseStockDomain[]>;
    getStockByProductAndWarehouse(productId: number, warehouseId: number): Promise<WarehouseStockDomain[]>;
    updStock(productId: number, warehouseId: number, newQty: number): Promise<WarehouseStockDomain>;
    updStockPrices(productId: number, warehouseId: number, newPrice: number): Promise<WarehouseStockDomain>;

    //! TODO: Add methods for getLowStock, getStockByLocation, updateMinMax, reserveStock, releaseReservation.
}