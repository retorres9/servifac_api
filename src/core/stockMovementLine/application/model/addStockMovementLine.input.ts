export type AddStockMovementLineInput = {
    intIdStockMovement: number;
    intIdProduct: number;
    intIdWarehouse: number;
    intChange: number;
    intNewQuantity: number;
    intPreviousQuantity: number;
};