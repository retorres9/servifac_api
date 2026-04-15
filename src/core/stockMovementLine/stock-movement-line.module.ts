import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockMovementLine } from "./infrastructure/typeorm/stock-movementLine.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([StockMovementLine])
    ]
})
export class StockMovementLineModule {}