import { TransactionContext } from "@common/domain/transaction.manager";
import { StockMovementLineDomain } from "../stockMovement.domain";

export const STOCK_MOVEMENT_LINE_INTERFACE = Symbol('STOCK_MOVEMENT_LINE_INTERFACE');

export interface IStockMovementLine {
    addStockMovementLine(entry: StockMovementLineDomain[], manager: TransactionContext ): Promise<any>;
    // getStockMovementLinesByMovement(movementId: number): Promise<any[]>;
    // getStockMovementLineById(lineId: number): Promise<any>;
    // updStockMovementLine(lineId: number, newData: any): Promise<any>;
    // delStockMovementLine(lineId: number): Promise<void>;
}