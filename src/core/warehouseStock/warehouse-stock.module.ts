import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehouseStock } from "./infrastructure/typeorm/warehouseStock.entity";
import { WarehouseStockController } from "./interface/controllers/warehouse-stock.controller";
import { WAREHOUSESTOCK_INTERFACE } from "./domain/repository/warehouseStock.interface";
import { WareHouseStockRepository } from "./infrastructure/typeorm/warehouseStock.repository";
import { GetStockByProductUseCase } from "./application/use-cases/getStockByProduct.usecase";
import { GetStockByWarehouseUseCase } from "./application/use-cases/getStockByWarehouse.usecase";
import { AddWarehouseStockMovementUseCase } from "./application/use-cases/add-stock-movement.usecase";
import { ProductModule } from "../product/product.module";
import { LocationModule } from "../location/location.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([WarehouseStock]),
        ProductModule,
        LocationModule  
    ],
    controllers: [WarehouseStockController],
    providers: [
        {
            provide: WAREHOUSESTOCK_INTERFACE,
            useClass: WareHouseStockRepository,
        },
        GetStockByProductUseCase,
        GetStockByWarehouseUseCase,
        AddWarehouseStockMovementUseCase
    ]
})
export class WarehouseStockModule {}