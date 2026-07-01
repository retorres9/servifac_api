import { Inject } from "@nestjs/common";
import { StockMovementLineRepository } from "../../infrastructure/typeorm/stockMovementLine.repository";
import { STOCK_MOVEMENT_LINE_INTERFACE } from "../../domain/repository/stockMovement.Line.interface";
import { TransactionContext } from "@common/domain/transaction.manager";
import { AddStockMovementLineInput } from "../model/addStockMovementLine.input";

export class AddStockMovementLineUseCase {
    constructor(
        @Inject(STOCK_MOVEMENT_LINE_INTERFACE) 
        private readonly stockMovementLineRepository: StockMovementLineRepository
    ) {
    }
    async execute(entry: AddStockMovementLineInput[], ctx: TransactionContext): Promise<any> {
        return await this.stockMovementLineRepository.addStockMovementLine(entry, ctx);
    }
}