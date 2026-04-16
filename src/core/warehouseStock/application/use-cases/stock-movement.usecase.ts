import { WAREHOUSE_INTERFACE, type IWarehouseStock } from "../../domain/repository/warehouseStock.interface";
import { BadRequestException, Inject, NotImplementedException } from "@nestjs/common";
import { StockMovementInput } from "../model/stock-movement.input";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";

export class StockMovementUseCase {
    constructor(
        @Inject(WAREHOUSE_INTERFACE)
        private readonly warehouseRepository: IWarehouseStock
    ) {}

    async execute(stockMovementInput: StockMovementInput): Promise<void> {
        // const billId = await this.warehouseRepository.getBillId(stockMovementInput.billId);
        // if (billId) {
        //     throw new BadRequestException('La factura ya ha sido ingresada en el sistema');
        // }
        // const entity: WarehouseStockDomain = {
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