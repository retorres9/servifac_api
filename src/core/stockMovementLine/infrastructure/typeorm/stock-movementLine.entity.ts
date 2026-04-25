import { Product } from "@core/product/infrastructure/persistence/typeorm/product.entity";
import { StockMovement } from "@core/stockMovement/infrastructure/typeorm/stock-movement.entity";
import { Warehouse } from "@core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StockMovementLine {
    @PrimaryGeneratedColumn()
    smlId!: number;

    @ManyToOne(() => StockMovement, (movement) => movement.stmLines)
    @JoinColumn({ name: 'smlFkMovementId' })
    smlFkMovementId!: StockMovement;

    @ManyToOne(() => Product, (product) => product.prodId)
    @JoinColumn({ name: 'smlFkProductId' })
    smlFkProductId!: Product;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.wrhId)
    @JoinColumn({ name: 'smlFkWarehouseId' })
    smlFkWarehouseId!: Warehouse;

    @Column({type: 'numeric', nullable: false})
    smlChange!: number;

    @Column({type: 'numeric', nullable: false})
    smlNewQuantity!: number;

    @Column({type: 'numeric', nullable: false})
    smlPreviousQuantity!: number;
}
