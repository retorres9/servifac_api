import { Body, Controller, Post } from "@nestjs/common";
import { AddStockMovementUseCase } from "../../application/use-cases/add-stock-movement.usecase";
import { AddStockMovementDto } from "../dto/add-stock-movement.dto";

@Controller('warehouse-stock')
export class WarehouseStockController {
    constructor(
        private readonly addStockMovementUseCase: AddStockMovementUseCase
    ) {}
    @Post('add-stock-movement')
    addStockMovement(@Body() addStockMovementDto: AddStockMovementDto): Promise<void> {
        return this.addStockMovementUseCase.execute(addStockMovementDto);
    }
}