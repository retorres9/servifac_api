import { WAREHOUSE_REPOSITORY, type WarehouseRepository } from "../../domain/repository/warehouseStock.repository";
import { BadRequestException, Inject, NotImplementedException } from "@nestjs/common";
import { StockMovementInput } from "../model/stock-movement.input";
import { WarehouseStockEntity } from "../../domain/warehouseStock.entity";

export class StockMovementUseCase {
    constructor(
        @Inject(WAREHOUSE_REPOSITORY)
        private readonly warehouseRepository: WarehouseRepository
    ) {}

    async execute(stockMovementInput: StockMovementInput): Promise<void> {
        // const billId = await this.warehouseRepository.getBillId(stockMovementInput.billId);
        // if (billId) {
        //     throw new BadRequestException('La factura ya ha sido ingresada en el sistema');
        // }
        // const entity: WarehouseStockEntity = {
        //     strProductCode: stockMovementInput.productCode,
        //     intQuantity: stockMovementInput.quantity,
        //     intLocationId: stockMovementInput.locationId,
        //     dtOccurredAt: stockMovementInput.occurredAt,
        //     strReference: stockMovementInput.reference,
        //     dcmUnitCost: stockMovementInput.unitCost,
        //     dcmBalanceAfter: stockMovementInput.balanceAfter,
        //     strNotes: stockMovementInput.notes,
        //     strBillId: stockMovementInput.billId
        // }
        // await this.warehouseRepository.createWarehouseEntry(entity);
        throw new NotImplementedException('Stock movement logic is not implemented yet');
    }
}