import { WAREHOUSE_REPOSITORY, type WarehouseRepository } from "../../domain/repository/warehouse.repository";
import { BadRequestException, Inject } from "@nestjs/common";
import { StockMovementInput } from "../model/stock-movement.input";
import { WarehouseEntity } from "../../domain/warehouse.entity";

export class StockMovementUseCase {
    constructor(
        @Inject(WAREHOUSE_REPOSITORY)
        private readonly warehouseRepository: WarehouseRepository
    ) {}

    async execute(stockMovementInput: StockMovementInput): Promise<void> {
        const billId = await this.warehouseRepository.getBillId(stockMovementInput.billId);
        if (billId) {
            throw new BadRequestException('La factura ya ha sido ingresada en el sistema');
        }
        const entity: WarehouseEntity = {
            strProductCode: stockMovementInput.productCode,
            intQuantity: stockMovementInput.quantity,
            strMovementType: stockMovementInput.movementType,
            intLocationId: stockMovementInput.locationId,
            dtOccurredAt: stockMovementInput.occurredAt,
            strReference: stockMovementInput.reference,
            dcmUnitCost: stockMovementInput.unitCost,
            dcmBalanceAfter: stockMovementInput.balanceAfter,
            strNotes: stockMovementInput.notes,
            strBillId: stockMovementInput.billId
        }
        await this.warehouseRepository.createWarehouseEntry(entity);
    }
}