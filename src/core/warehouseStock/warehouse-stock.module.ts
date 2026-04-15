import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseStock } from "./infrastructure/typeorm/warehouseStock.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([WarehouseStock])
    ],
    controllers: [],
    providers: []
})
export class WarehouseStockModule {}