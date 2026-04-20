import { Inject } from "@nestjs/common";
import { STOCK_MOVEMENT_INTERFACE, type IStockMovement } from "../../domain/repository/stockMovement.interface";

export class GetStockMovementByProdAndWarehouseUseCase {
    constructor(
        @Inject(STOCK_MOVEMENT_INTERFACE)
        private readonly stockMovementRepository: IStockMovement
    ) {}

    async execute(productId: number, warehouseId: number): Promise<any[]> {
        return this.stockMovementRepository.getStockMovementsByProductAndWarehouse(productId, warehouseId);
    }
}