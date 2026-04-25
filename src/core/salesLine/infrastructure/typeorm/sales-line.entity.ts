import { Product } from "@core/product/infrastructure/persistence/typeorm/product.entity";
import { Sales } from "@core/sales/infrastructure/typeorm/sales.entity";
import { Warehouse } from "@core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SalesLine {
    @PrimaryGeneratedColumn()
    sllId!: number;

    @ManyToOne(() => Sales)
    @JoinColumn({ name: 'sllFkIdSales' })
    sllFkIdSales!: Sales;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'sllFkIdProduct' })
    sllFkIdProduct!: Product;

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'sllFkIdWarehouse' })
    sllFkIdWarehouse!: Warehouse;

    @Column({type: 'numeric', nullable: false})
    sllQuantity!: number;

    @Column({type: 'money', nullable: false})
    sllUnitPrice!: number;

    @Column({type: 'money', nullable: false})
    sllTotalPrice!: number;

    @Column({type: 'money', nullable: true})
    sllDiscount!: number;
}