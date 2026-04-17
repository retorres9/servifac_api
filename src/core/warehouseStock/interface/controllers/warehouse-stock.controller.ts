import { Body, Controller, Post } from "@nestjs/common";
import { AddStockMovementUseCase } from "../../application/use-cases/add-stock-movement.usecase";
import { AddStockMovementDto } from "../dto/add-stock-movement.dto";
import { GetStockByProductDto } from "../dto/get-stock-by-product.dto";
import { GetStockByProductUseCase } from "../../application/use-cases/getStockByProduct.usecase";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";

@Controller('warehouse-stock')
export class WarehouseStockController {
    constructor(
        private readonly addStockMovementUseCase: AddStockMovementUseCase,
        private readonly getStockByProductUseCase: GetStockByProductUseCase
    ) {}
    @Post('add-stock-movement')
    addStockMovement(@Body() addStockMovementDto: AddStockMovementDto): Promise<void> {
        return this.addStockMovementUseCase.execute(addStockMovementDto);
    }

    @Post('get-stock-by-product')
    getStockByProduct(@Body() getStockByProductDto: GetStockByProductDto): Promise<WarehouseStockDomain[]> {
        return this.getStockByProductUseCase.execute(getStockByProductDto.productId);
    }
}