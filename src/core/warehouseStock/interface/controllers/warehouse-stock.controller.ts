import { Body, Controller, Post } from "@nestjs/common";
import { AddWarehouseStockMovementUseCase } from "../../application/use-cases/add-stock-movement.usecase";
import { AddStockMovementDto } from "../dto/add-stock-movement.dto";
import { GetStockByProductDto } from "../dto/get-stock-by-product.dto";
import { GetStockByProductUseCase } from "../../application/use-cases/getStockByProduct.usecase";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";
import { GetStockByWarehouseOutput } from "../../application/model/getStockByWarehouse.output";
import { GetStockByWarehouseUseCase } from "../../application/use-cases/getStockByWarehouse.usecase";

@Controller('warehouse-stock')
export class WarehouseStockController {
    constructor(
        private readonly addStockMovementUseCase: AddWarehouseStockMovementUseCase,
        private readonly getStockByProductUseCase: GetStockByProductUseCase,
        private readonly getStockByWarehouseUseCase: GetStockByWarehouseUseCase
    ) {}
    @Post('add-stock-movement')
    addStockMovement(@Body() addStockMovementDto: AddStockMovementDto): Promise<void> {
        return this.addStockMovementUseCase.execute(addStockMovementDto);
    }

    @Post('get-stock-by-product')
    getStockByProduct(@Body() getStockByProductDto: GetStockByProductDto): Promise<WarehouseStockDomain[]> {
        return this.getStockByProductUseCase.execute(getStockByProductDto.productId);
    }

    @Post('get-stock-by-warehouse')
    getStockByWarehouse(@Body() getStockByWarehouseDto: { warehouseId: number }): Promise<GetStockByWarehouseOutput[]> {
        return this.getStockByWarehouseUseCase.execute(getStockByWarehouseDto.warehouseId);
    }
}