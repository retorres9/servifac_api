import { Inject } from "@nestjs/common";
import { StockMovementLineRepository } from "../../infrastructure/typeorm/stockMovementLine.repository";
import { STOCKMOVEMENTLINE_INTERFACE } from "../../domain/repository/stockMovement.Line.interface";

export class AddStockMovementLineUseCase {
    constructor(
        @Inject(STOCKMOVEMENTLINE_INTERFACE) 
        private readonly stockMovementLineRepository: StockMovementLineRepository
    ) {
    }
    async execute(entry: any): Promise<any> {
        return await this.stockMovementLineRepository.addStockMovementLine(entry);
    }
}