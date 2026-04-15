import { LocationEntity } from "src/core/location/infrastructure/typeorm/location.entity";
import { ProductEntity } from "src/core/product/infrastructure/persistence/typeorm/product.entity";
import { Warehouse } from "src/core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity()
@Index(["wrsFkProductCode", "wrsFkWarehouseId"], { unique: true })
@Index(["wrsFkProductCode", "wrsFkWarehouseId", "wrsFkLocationId"], { unique: true })
export class WarehouseStock {
    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'wrsFkProductCode' })
    wrsFkProductCode!: ProductEntity;

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'wrsFkWarehouseId' })
    wrsFkWarehouseId!: Warehouse;

    @Column({type: 'numeric', nullable: false})
    wrsQuantity!: number;

    @Column({type: 'numeric', nullable: true})
    wrsReservedQuantity!: number;

    @Column({type: 'varchar', nullable: true})
    wrsUnityOfMeasure!: string;

    @ManyToOne(() => LocationEntity)
    @JoinColumn({ name: 'wrsFkLocationId' })
    wrsFkLocationId!: LocationEntity;

}