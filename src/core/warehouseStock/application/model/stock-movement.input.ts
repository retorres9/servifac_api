export type StockMovementInput = {
    productCode: string;
    locationId: number;
    occurredAt: Date;
    quantity: number;
    reference: string;
    unitCost: number;
    movementType: string;
    balanceAfter: number;
    notes: string;
    billId: string;
    createdAt: Date;
    updatedAt: Date;
};