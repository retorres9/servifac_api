import { Body, Controller, Post } from "@nestjs/common";
import { AddStockMovementUseCase } from "../../application/use-cases/addStockMovement.usecase";
import { StockMovementDto } from "../dto/addStockMovement.dto";


@Controller('stock-movement')
export class StockMovementController {
    constructor(
        private readonly addStockMovementUseCase: AddStockMovementUseCase
    ) {}
    @Post('add-stock-movement')
    addStockMovement(@Body() addStockMovementDto: StockMovementDto): Promise<void> {
        return this.addStockMovementUseCase.execute(addStockMovementDto);
    }
}