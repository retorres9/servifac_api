import { IStockMovement } from "../../domain/repository/stockMovement.interface";
import { StockMovementDomain } from "../../domain/stockMovement.domain";

export class AddStockMovementUseCase {
    constructor(
        private readonly stockMovementRepository: IStockMovement
    ) {}

    async execute(entry: StockMovementDomain): Promise<void> {
        await this.stockMovementRepository.addStockMovement(entry);
    }
}