export type AddStockMovementLineInput = {
    intIdStockMovement: number;
    intIdProduct: number;
    intIdWarehouse: number;
    intChange: number;
    intNewQty: number;
    intPrevQty: number;
};