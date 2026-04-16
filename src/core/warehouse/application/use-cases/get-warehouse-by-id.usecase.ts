import { Inject } from "@nestjs/common";
import { WAREHOUSE_INTERFACE } from "../../domain/repository/warehouse.interface";

export class GetWarehouseByIdUseCase {
  constructor(
    @Inject(WAREHOUSE_INTERFACE)
    private readonly warehouseRepository: any
  ) {}
}