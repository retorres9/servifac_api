export type AddStockMovementInput = {
    intIdProduct: number;
    intIdWarehouse: number;
    intQuantity: number;
    dcmPrice: number;
    strMovementType: string;
    dtmMovementDate: Date;
};