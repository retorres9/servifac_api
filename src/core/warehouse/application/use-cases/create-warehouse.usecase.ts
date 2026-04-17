import { BadRequestException, Inject } from "@nestjs/common";
import { WAREHOUSE_INTERFACE, type IWarehouse } from "../../domain/repository/warehouse.interface";
import { CreateWarehouseInput } from "../model/create-warehosue.input";
import { WarehouseDomain } from "../../domain/warehouse.domain";
import { type IParameter, PARAMETER_INTERFACE } from "src/core/parameter/domain/repository/parameter.interface";

export class CreateWarehouseUseCase {
    constructor(
        @Inject(WAREHOUSE_INTERFACE)
        private readonly warehouseRepository: IWarehouse,
        @Inject(PARAMETER_INTERFACE)
        private readonly parameterRepository: IParameter
    ) {}

    async execute(input: CreateWarehouseInput): Promise<void> {
        const typeOfWarehouse = await this.parameterRepository.findParameterById(input.intTypeOfWarehouse);
        if (!typeOfWarehouse) {
            throw new BadRequestException('Invalid type of warehouse');
        }
        
        const existingWarehouse = await this.warehouseRepository.getWarehouseEntryByName(input.strWarehouseName);
        if (existingWarehouse) {
            throw new BadRequestException('Warehouse already exists');
        }
        const warehouseEntity: Partial<WarehouseDomain> = {
            strWarehouseName: input.strWarehouseName,
            strWarehouseDescription: input.strWarehouseDescription,
            intTypeOfWarehouse: input.intTypeOfWarehouse,
            strWarehouseAddress: input.strWarehouseAddress
        };
        await this.warehouseRepository.createWarehouseEntry(warehouseEntity);
    }
}