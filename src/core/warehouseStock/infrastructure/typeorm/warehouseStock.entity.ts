import { LocationEntity } from "src/core/location/infrastructure/typeorm/location.entity";
import { ProductEntity } from "src/core/product/infrastructure/persistence/typeorm/product.entity";
import { Warehouse } from "src/core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity()
@Index(["wrsFkProductCode", "wrsFkWarehouseStockCode"], { unique: true })
@Index(["wrsFkProductCode", "wrsFkWarehouseStockCode", "wrsFkLocationId"], { unique: true })
export class WarehouseStock {
    @ManyToOne(() => ProductEntity, (product) => product.prodBarcode)
    @JoinColumn({ name: 'wrsFkProductCode' })
    product!: ProductEntity;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.wrhId)
    @JoinColumn({ name: 'wrsFkWarehouseId' })
    warehouseStock!: Warehouse;

    @Column({type: 'numeric', nullable: false})
    wrsQuantity!: number;

    @Column({type: 'numeric', nullable: true})
    wrsReservedQuantity!: number;

    @Column({type: 'varchar', nullable: true})
    wrsUnityOfMeasure!: string;

    @ManyToOne(() => LocationEntity, (location) => location.locId)
    @JoinColumn({ name: 'wrsFkLocationId' })
    location!: LocationEntity;

}