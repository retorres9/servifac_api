import { TypeOrmModule } from "@nestjs/typeorm";
import { StockMovement } from "./infrastructure/typeorm/stock-movement.entity";
import { Module } from "@nestjs/common";
import { STOCK_MOVEMENT_INTERFACE } from "./domain/repository/stockMovement.interface";
import { StockMovementRepository } from "./infrastructure/typeorm/stock-movement.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([StockMovement])
    ],
    controllers: [],
    providers: [
        {
            provide: STOCK_MOVEMENT_INTERFACE,
            useClass: StockMovementRepository,
        }
    ],
    exports: [STOCK_MOVEMENT_INTERFACE]
})
export class StockMovementModule {}