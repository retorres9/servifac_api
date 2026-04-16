import { Location } from "src/core/location/infrastructure/typeorm/location.entity";
import { Product } from "src/core/product/infrastructure/persistence/typeorm/product.entity";
import { Warehouse } from "src/core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["wrsFkProductCode", "wrsFkWarehouseId", "wrsFkLocationId"], { unique: true })
export class WarehouseStock {
    @PrimaryGeneratedColumn()
    wrsId!: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'wrsFkProductCode' })
    wrsFkProductCode!: Product;

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'wrsFkWarehouseId' })
    wrsFkWarehouseId!: Warehouse;

    @Column({type: 'numeric', nullable: false})
    wrsQuantity!: number;

    @Column({type: 'numeric', nullable: true})
    wrsReservedQuantity!: number;

    @Column({type: 'varchar', nullable: true})
    wrsUnityOfMeasure!: string;

    @ManyToOne(() => Location)
    @JoinColumn({ name: 'wrsFkLocationId' })
    wrsFkLocationId!: Location;

    @Column({type: 'money', nullable: false})
    wrsCost!: number;

    @Column({type: 'money', nullable: false})
    wrsSalePrice!: number;

    @Column({type: 'money', nullable: true})
    wrsDiscountPrice!: number;

    @Column({type: 'numeric', nullable: true})
    wrsMinQuantity!: number;

    @Column({type: 'numeric', nullable: true})
    wrsMaxQuantity!: number;
}