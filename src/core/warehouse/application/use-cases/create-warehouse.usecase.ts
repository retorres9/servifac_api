import { BadRequestException, Inject } from "@nestjs/common";
import { WAREHOUSE_REPOSITORY, type IWarehouseRepository } from "../../domain/repository/warehouse.repository";
import { CreateWarehouseInput } from "../model/create-warehosue.input";
import { WarehouseEntity } from "../../domain/warehouse.entity";
import { DeepPartial } from "typeorm";
import { type IParameterRepository, PARAMETER_REPOSITORY } from "src/core/parameter/domain/repository/parameter.repository";

export class CreateWarehouseUseCase {
    constructor(
        @Inject(WAREHOUSE_REPOSITORY)
        private readonly warehouseRepository: IWarehouseRepository,
        @Inject(PARAMETER_REPOSITORY)
        private readonly parameterRepository: IParameterRepository
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
        const warehouseEntity: DeepPartial<WarehouseEntity> = {
            strWarehouseName: input.strWarehouseName,
            strWarehouseDescription: input.strWarehouseDescription,
            intTypeOfWarehouse: typeOfWarehouse,
            strWarehouseAddress: input.strWarehouseAddress
        };
        await this.warehouseRepository.createWarehouseEntry(warehouseEntity);
    }
}