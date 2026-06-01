import { TypeOrmModule } from "@nestjs/typeorm";
import { StockMovement } from "./infrastructure/typeorm/stock-movement.entity";
import { Module } from "@nestjs/common";
import { STOCK_MOVEMENT_INTERFACE } from "./domain/repository/stockMovement.interface";
import { StockMovementRepository } from "./infrastructure/typeorm/stock-movement.repository";
import { StockMovementController } from "./interface/controller/stockMovement.controller";
import { AddStockMovementUseCase } from "./application/use-cases/addStockMovement.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([StockMovement])
    ],
    controllers: [StockMovementController],
    providers: [
        {
            provide: STOCK_MOVEMENT_INTERFACE,
            useClass: StockMovementRepository,
        },
        AddStockMovementUseCase,
    ],
    exports: [STOCK_MOVEMENT_INTERFACE]
})
export class StockMovementModule {}