import { Module } from "@nestjs/common";
import { WarehouseController } from "./interface/controllers/warehouse.controller";
import { Warehouse } from "./infrastructure/typeorm/warehouse.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WAREHOUSE_REPOSITORY } from "./domain/repository/warehouse.repository";
import { WarehouseTypeormRepository } from "./infrastructure/typeorm/warehouse.repository";
import { CreateWarehouseUseCase } from "./application/use-cases/create-warehouse.usecase";
import { ParameterModule } from "../parameter/parameter.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse]),
        ParameterModule
    ],
    controllers: [WarehouseController],
    providers: [{
        provide: WAREHOUSE_REPOSITORY,
        useClass: WarehouseTypeormRepository
    },
    CreateWarehouseUseCase]
})
export class WarehouseModule {}