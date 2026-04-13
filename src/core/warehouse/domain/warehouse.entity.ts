import { ParameterEntity } from "src/core/parameter/domain/parameter.entity";

export class WarehouseEntity {
    constructor(
        public intIdWarehouse: number,
        public strWarehouseName: string,
        public strWarehouseDescription: string,
        public intTypeOfWarehouse: ParameterEntity,
        public strWarehouseAddress: string
    ) {}
}