import { TypeOrmModule } from "@nestjs/typeorm";
import { StockMovement } from "./infrastructure/typeorm/stock-movement.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([StockMovement])
    ],
    controllers: [],
    providers: []
})
export class StockMovementModule {}