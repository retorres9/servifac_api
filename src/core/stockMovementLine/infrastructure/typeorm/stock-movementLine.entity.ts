import { ProductEntity } from "src/core/product/infrastructure/persistence/typeorm/product.entity";
import { StockMovement } from "src/core/stockMovement/infrastructure/typeorm/stock-movement.entity";
import { Warehouse } from "src/core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StockMovementLine {
    @PrimaryGeneratedColumn()
    smlId!: number;

    @ManyToOne(() => StockMovement, (movement) => movement.lines)
    @JoinColumn({ name: 'smlFkMovementId' })
    smlFkMovementId!: StockMovement;

    @ManyToOne(() => ProductEntity, (product) => product.prodId)
    @JoinColumn({ name: 'smlFkProductId' })
    smlFkProductId!: ProductEntity;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.wrhId)
    @JoinColumn({ name: 'smlFkWarehouseId' })
    smlFkWarehouseId!: Warehouse;

    @Column({type: 'numeric', nullable: false})
    smlChange!: number;

    @Column({type: 'numeric', nullable: false})
    smlNewQuantity!: number;

    @Column({type: 'numeric', nullable: false})
    smlPreviousQuantity!: number;

    @Column({type: 'varchar', nullable: true})
    smlNote?: string;
}
