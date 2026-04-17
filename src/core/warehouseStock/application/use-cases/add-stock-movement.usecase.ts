import { WAREHOUSESTOCK_INTERFACE, type IWarehouseStock } from "../../domain/repository/warehouseStock.interface";
import { BadRequestException, Inject } from "@nestjs/common";
import { AddStockMovementInput } from "../model/add-stock-movement.input";
import { WarehouseStockDomain } from "../../domain/warehouseStock.domain";
import { type IProduct, PRODUCT_INTERFACE } from "src/core/product/domain/repository/product.interface";
import { type ILocation, LOCATION_INTERFACE } from "src/core/location/domain/repository/location.interface";
import { LocationDomain } from "src/core/location/domain/location.domain";
import { ProductDomain } from "src/core/product/domain/product.domain";

export class AddStockMovementUseCase {
    constructor(
        @Inject(WAREHOUSESTOCK_INTERFACE)
        private readonly warehouseRepository: IWarehouseStock,
        @Inject(PRODUCT_INTERFACE)
        private readonly productRepository: IProduct,
        @Inject(LOCATION_INTERFACE)
        private readonly locationRepository: ILocation
    ) {}

    async execute(stockMovementInput: AddStockMovementInput): Promise<void> {
        const [product, warehouse, location] = await Promise.all([
            this.productRepository.getProductById(stockMovementInput.productId),
            this.warehouseRepository.getStockByProductAndWarehouse(stockMovementInput.productId, stockMovementInput.warehouseId),
            this.locationRepository.getLocationById(stockMovementInput.locationId)
        ]);
        this.StockMovementValidations(warehouse, product, location);
        const entity: WarehouseStockDomain = {
            intProductCode: stockMovementInput.productId,
            intQuantity: stockMovementInput.quantity,
            intLocationId: stockMovementInput.locationId,
            dcmPrice: stockMovementInput.unitCost,
            intWarehouseId: stockMovementInput.warehouseId,
            intReserved: stockMovementInput.reservedQty || null,
            strUnityOfMeasure: stockMovementInput.unityOfMeasure,
            dcmDiscount: stockMovementInput.discount,
            intMinimumStock: stockMovementInput.minimumStock,
            intMaximumStock: stockMovementInput.maximumStock
        }
        await this.warehouseRepository.addStock(entity);

    }
    private StockMovementValidations(warehouse: WarehouseStockDomain[], product: ProductDomain | null, location: LocationDomain | null): void {
        if (!warehouse) {
            throw new BadRequestException('El almacén especificado no tiene movimientos de stock registrados para este producto');
        }
        if (product) {
            throw new BadRequestException('El producto ya tiene movimientos de stock registrados');
        }
        if (!location) {
            throw new BadRequestException('La ubicación especificada no existe');
        }
    }
}