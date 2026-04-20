import { Inject } from "@nestjs/common";
import { type IStockMovement, STOCK_MOVEMENT_INTERFACE } from "../../domain/repository/stockMovement.interface";

export class GetStockMovementByProductUseCase {
    constructor(
        @Inject(STOCK_MOVEMENT_INTERFACE)
        private readonly stockMovementRepository: IStockMovement
    ) {}

    async execute(intIdProduct: number): Promise<any[]> {
        return this.stockMovementRepository.getStockMovementsByProduct(intIdProduct);
    }
}