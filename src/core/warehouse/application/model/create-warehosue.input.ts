export type CreateWarehouseInput = {
    strWarehouseName: string;
    strWarehouseDescription: string;
    intTypeOfWarehouse: number;
    strWarehouseAddress: string;
    intWarehouseStock?: number;
};