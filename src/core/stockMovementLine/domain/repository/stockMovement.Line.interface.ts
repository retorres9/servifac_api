import { StockMovementLineDomain } from "../stockMovement.domain";

export const STOCKMOVEMENTLINE_INTERFACE = Symbol('STOCKMOVEMENTLINE_INTERFACE');

export interface IStockMovementLine {
    addStockMovementLine(entry: StockMovementLineDomain[]): Promise<any>;
    // getStockMovementLinesByMovement(movementId: number): Promise<any[]>;
    // getStockMovementLineById(lineId: number): Promise<any>;
    // updStockMovementLine(lineId: number, newData: any): Promise<any>;
    // delStockMovementLine(lineId: number): Promise<void>;
}