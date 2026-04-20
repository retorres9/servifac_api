import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockMovementLine } from "./infrastructure/typeorm/stock-movementLine.entity";
import { STOCKMOVEMENTLINE_INTERFACE } from "./domain/repository/stockMovement.Line.interface";
import { StockMovementLineRepository } from "./infrastructure/typeorm/stockMovementLine.repository";
import { AddStockMovementLineUseCase } from "./application/use-cases/addStockMovementLine.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([StockMovementLine])
    ],
    providers: [{
        provide: STOCKMOVEMENTLINE_INTERFACE,
        useClass: StockMovementLineRepository,
    },
    AddStockMovementLineUseCase],
    exports: [STOCKMOVEMENTLINE_INTERFACE]})
export class StockMovementLineModule {}