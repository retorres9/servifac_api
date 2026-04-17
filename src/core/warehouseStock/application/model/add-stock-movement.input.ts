export type AddStockMovementInput = {
    productId: number;
    locationId: number;
    warehouseId: number;
    quantity: number;
    unitCost: number;
    reservedQty?: number;
    unityOfMeasure?: string;
    discount?: number;
    minimumStock?: number;
    maximumStock?: number;
};