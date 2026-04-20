import { Inject } from "@nestjs/common";
import { type IStockMovement, STOCK_MOVEMENT_INTERFACE } from "../../domain/repository/stockMovement.interface";

export class GetStockMovementByWarehouseUseCase {
    constructor(
        @Inject(STOCK_MOVEMENT_INTERFACE)
        private readonly stockMovementRepository: IStockMovement
    ) {}

    async execute(warehouseId: number): Promise<any[]> {
        return this.stockMovementRepository.getStockMovementsByWarehouse(warehouseId);
    }
}