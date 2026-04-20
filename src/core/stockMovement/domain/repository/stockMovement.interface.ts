import { StockMovementDomain } from "../stockMovement.domain";

export const STOCK_MOVEMENT_INTERFACE = Symbol('STOCK_MOVEMENT_INTERFACE');

export interface IStockMovement {
    addStockMovement(stockMovement: StockMovementDomain): Promise<void>;
    getStockMovementsByProduct(productId: number): Promise<StockMovementDomain[]>;
    getStockMovementsByWarehouse(warehouseId: number): Promise<StockMovementDomain[]>;
    getStockMovementsByProductAndWarehouse(productId: number, warehouseId: number): Promise<StockMovementDomain[]>;
}