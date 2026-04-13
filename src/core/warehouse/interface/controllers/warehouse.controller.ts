import { Body, Controller, Post } from "@nestjs/common";
import { CreateWarehouseUseCase } from "../../application/use-cases/create-warehouse.usecase";
import { CreateWarehouseDto } from "../dto/create-warehouse.dto";

@Controller('warehouses')
export class WarehouseController {
    constructor(
        private readonly createWarehouseUseCase: CreateWarehouseUseCase
    ) {}

    @Post('new')
    createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
        return this.createWarehouseUseCase.execute(createWarehouseDto);
    }
}